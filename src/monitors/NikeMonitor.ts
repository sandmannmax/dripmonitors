import fetch from 'node-fetch';
import { Product } from '../types/Product';
import { MonitorModel } from '../model/Monitor';
import { DiscordService } from '../services/DiscordService';
import { RedisService } from '../services/RedisService';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';

export class NikeMonitor {
  private monitorModel: MonitorModel;
  private discordService: DiscordService;
  private redisService: RedisService;

  constructor(monitorModel: MonitorModel, discordService: DiscordService, redisService: RedisService) {
    this.monitorModel = monitorModel;
    this.discordService = discordService;
    this.redisService = redisService;
  }

  async Setup() {
    this.redisService.SetRunningState('nike', false);
  }

  async Run() {
    try {
      if (await this.redisService.GetRunningState('nike'))
        return;
    
      await this.redisService.SetRunningState('nike', true);
    
      let products = await this.GetItems();

      let oldProducts = await this.redisService.GetProductIds('nike');
      let productsStillAvailableStatus = new Array(oldProducts.length);
      productsStillAvailableStatus = productsStillAvailableStatus.fill(false);

      let monitors;
    
      for (let i = 0; i < products.length; i++) {
        productsStillAvailableStatus[oldProducts.indexOf(products[i]._id)] = true;

        let product = await this.redisService.GetProduct('nike', products[i]._id);
        let sendMessage = false;

        if (product == null) {
          await this.redisService.AddProduct('nike', products[i]);

          if (products[i].active && !products[i].soldOut)
            sendMessage = true;
        } else {
          if (product.active != products[i].active) {
            await this.redisService.ChangeActiveState('nike', products[i]._id, products[i].active);

            if (products[i].active && !products[i].soldOut)
              sendMessage = true;
          }

          if (product.soldOut != products[i].soldOut) {
            await this.redisService.ChangeSoldOutState('nike', products[i]._id, products[i].soldOut);

            if (products[i].active && !products[i].soldOut)
              sendMessage = true;
          }          
        }

        if (sendMessage) {
          if (!monitors)
            monitors = await this.monitorModel.GetMonitors();

          for (let j = 0; j < monitors.length; j++) {
            if (monitors[j].webHook)
              await this.discordService.SendMessage({ 
                monitor: monitors[j], 
                product: product,
                page: 'Nike SNKRS'
              });
          }
        }
      }

      for (let i = 0; i < oldProducts.length; i++) {
        if (!productsStillAvailableStatus[i])
          await this.redisService.ChangeActiveState('nike', oldProducts[i], false);
      }
    
      await this.redisService.SetRunningState('nike', false);
    }
    catch (e) {
      console.log('Fehler in NikeMonitor.Run(): ', e);      
      await this.redisService.SetRunningState('nike', false);
    }    
  }

  private async GetItems() {
    let items: Array<Product> = [];
    let location = 'DE';
    let language = 'de';
    for (let i = 0; i < 180; i += 60) {
      let url = `https://api.nike.com/product_feed/threads/v2/?anchor=${i}&count=60&filter=marketplace%28${location}%29&filter=language%28${language}%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&fields=active%2Cid%2ClastFetchTime%2CproductInfo%2CpublishedContent.nodes%2CpublishedContent.subType%2CpublishedContent.properties.coverCard%2CpublishedContent.properties.productCard%2CpublishedContent.properties.products%2CpublishedContent.properties.publish.collections%2CpublishedContent.properties.relatedThreads%2CpublishedContent.properties.seo%2CpublishedContent.properties.threadType%2CpublishedContent.properties.custom%2CpublishedContent.properties.title`
      let response = await fetch(url, {
        method: 'GET',
        headers: {
          'User-Agent': GetRandomUserAgent()
        }
      });
      let json = await response.json();
      for (let j = 0; j < json.objects.length; j++) {
        if (json.objects[j].productInfo) {
          let name = `${json.objects[j].publishedContent.properties.title} ${json.objects[j].publishedContent.properties.coverCard.properties.title}`;
          let href = `https://www.nike.com/${location.toLowerCase()}/launch/t/${json.objects[j].publishedContent.properties.seo.slug}`;
          try {
            for (let k = 0; k < json.objects[j].productInfo.length; k++) {
              let productJson = json.objects[j].productInfo[k];
              let product: Product = new Product();
              product._id = productJson.merchProduct.id;
              product.active = productJson.merchProduct.status == 'ACTIVE';
              if (productJson.launchView) {
                let launchDate = new Date(productJson.launchView.startEntryDate);
                if (launchDate > new Date(Date.now()))
                  product.active = false;
              }
              product.href = productJson.productContent ? `https://www.nike.com/${location.toLowerCase()}/launch/t/${productJson.productContent.slug}` : href;
              product.img = productJson.imageUrls.productImageUrl;
              product.name = productJson.productContent ? productJson.productContent.fullTitle : name;
              product.price = `${productJson.merchPrice.currentPrice} ${productJson.merchPrice.currency}`;
              product.soldOut = !productJson.availability.available;
              product.sizes = [];
              product.sizesSoldOut = [];
              if (productJson.skus) {
                let skuIds = [];
                for (let l = 0; l < productJson.skus.length; l++) {
                  skuIds.push(productJson.skus[l].id);
                  product.sizes.push(productJson.skus[l].nikeSize);
                  product.sizesSoldOut.push(true);
                }
                if (productJson.availableSkus)
                for (let l = 0; l < productJson.availableSkus.length; l++) {
                  product.sizesSoldOut[skuIds.indexOf(productJson.availableSkus[l].id)] = !productJson.availableSkus[l].available;
                }
              }
              items.push(product);
            }
          }
          catch (e) {
            console.log('ERROR: ' + name + ' ' + e)
          } 
        }         
      }
      this.Sleep(1000);
    }
    return items;
  }
  
  private async Sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
}