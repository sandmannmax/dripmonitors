import fetch from 'node-fetch';
import { Product } from '../types/Product';
import { MonitorModel } from '../models/Monitor';
import { RedisService } from '../services/RedisService';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { ProxyModel } from '../models/ProxyModel';

export namespace NikeMonitor {

  export async function Setup() {
    const redisService = new RedisService();
    redisService.SetRunningState('nike', false);
  }

  export async function Run(job) {
    const redisService = new RedisService();

    try {
      if (await redisService.GetRunningState('nike'))
        return;
    
      await redisService.SetRunningState('nike', true);

      const proxy = await ProxyModel.GetRandomProxy({ page: 'nike' });
      let proxyString;

      if (!proxy) {
        logger.error(`NikeMonitor: No Proxy Available`);
        await redisService.SetRunningState('nike', false);
        return;
      }

      proxyString = proxy.address + ":" + proxy.port;
      logger.debug(`NikeMonitor: Using proxy ${proxyString}`);

      let products = await GetItems(proxyString);

      if (products == null) {
        await ProxyModel.SetCooldown({ page: 'nike', proxyId: proxy._id });
        await redisService.SetRunningState('nike', false);
        return;
      }

      await ProxyModel.ResetCooldown({ page: 'nike', proxyId: proxy._id });

      let oldProducts = await redisService.GetProductIds('nike');
      let productsStillAvailableStatus = new Array(oldProducts.length);
      productsStillAvailableStatus = productsStillAvailableStatus.fill(false);

      let monitors;
    
      for (let i = 0; i < products.length; i++) {
        let index = oldProducts.indexOf(products[i]._id);
        if (index != -1)
          productsStillAvailableStatus[index] = true;

        let product = await redisService.GetProduct('nike', products[i]._id);
        let sendMessage = false;

        if (product == null) {
          await redisService.AddProduct('nike', products[i]);

          if (products[i].active && !products[i].soldOut)
            sendMessage = true;
        } else {
          await redisService.ChangeSizes('nike', products[i]._id, products[i].sizes, products[i].sizesSoldOut);

          if (product.active != products[i].active) {
            await redisService.ChangeActiveState('nike', products[i]._id, products[i].active);

            if (products[i].active && !products[i].soldOut)
              sendMessage = true;
          }

          if (product.soldOut != products[i].soldOut) {
            await redisService.ChangeSoldOutState('nike', products[i]._id, products[i].soldOut);

            if (products[i].active && !products[i].soldOut)
              sendMessage = true;
          }          
        }

        if (sendMessage) {
          if (!monitors)
            monitors = await MonitorModel.GetUserMonitors();

          for (let j = 0; j < monitors.length; j++) {
            // if (monitors[j].webHook)
              // await DiscordService.SendMessage({ 
              //   monitor: monitors[j], 
              //   product: products[i],
              //   page: 'Nike SNKRS'
              // });
          }
        }
      }

      for (let i = 0; i < oldProducts.length; i++) {
        if (!productsStillAvailableStatus[i])
          await redisService.ChangeActiveState('nike', oldProducts[i], false);
      }
    
      await redisService.SetRunningState('nike', false);
    }
    catch (e) {
      logger.error('Error in NikeMonitor.Run(): ', e);      
      await redisService.SetRunningState('nike', false);
    }    
  }  
}

const GetItems = async (proxy) => {
  let items: Array<Product> = [];
  let location = 'DE';
  let language = 'de';
  for (let i = 0; i < 180; i += 60) {
    let url = `https://api.nike.com/product_feed/threads/v2/?anchor=${i}&count=60&filter=marketplace%28${location}%29&filter=language%28${language}%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&fields=active%2Cid%2ClastFetchTime%2CproductInfo%2CpublishedContent.nodes%2CpublishedContent.subType%2CpublishedContent.properties.coverCard%2CpublishedContent.properties.productCard%2CpublishedContent.properties.products%2CpublishedContent.properties.publish.collections%2CpublishedContent.properties.relatedThreads%2CpublishedContent.properties.seo%2CpublishedContent.properties.threadType%2CpublishedContent.properties.custom%2CpublishedContent.properties.title`
    let response;
    try {
      response = await fetch(url, {
        method: 'GET',
        agent: new HttpsProxyAgent(proxy),
        headers: {
          'User-Agent': GetRandomUserAgent()
        }
      });
    } catch (e) {
      logger.error(`NikeMonitor: Error with Proxy ${proxy} - ${e}`)
      return null;
    }
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
          logger.error('Error in NikeMonitor.GetItems(): ', e);
        } 
      }         
    }
    Sleep(1000);
  }
  return items;
}

const Sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   