import fetch from 'node-fetch';
import JsSoup from 'jssoup';
import { Product } from '../types/Product';
import { MonitorModel } from '../model/Monitor';
import { DiscordService } from '../services/DiscordService';
import { RedisService } from '../services/RedisService';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';

export class SnipesMonitor {
  private monitorModel: MonitorModel;
  private discordService: DiscordService;
  private redisService: RedisService;

  constructor(monitorModel: MonitorModel, discordService: DiscordService, redisService: RedisService) {
    this.monitorModel = monitorModel;
    this.discordService = discordService;
    this.redisService = redisService;
  }

  async Setup() {
    this.redisService.SetRunningState('snipes', false);
  }

  async Run() {
    try {
      if (await this.redisService.GetRunningState('snipes'))
        return;
    
      await this.redisService.SetRunningState('snipes', true);
    
      let products = await this.GetItems();

      // let oldProducts = await this.redisService.GetProductIds('snipes');
      // let productsStillAvailableStatus = new Array(oldProducts.length);
      // productsStillAvailableStatus = productsStillAvailableStatus.fill(false);

      // let monitors;
    
      // for (let i = 0; i < products.length; i++) {
      //   productsStillAvailableStatus[oldProducts.indexOf(products[i]._id)] = true;

      //   let product = await this.redisService.GetProduct('snipes', products[i]._id);
      //   let sendMessage = false;

      //   if (product == null) {
      //     await this.redisService.AddProduct('snipes', products[i]);

      //     if (products[i].active && !products[i].soldOut)
      //       sendMessage = true;
      //   } else {
      //     if (product.active != products[i].active) {
      //       await this.redisService.ChangeActiveState('snipes', products[i]._id, products[i].active);

      //       if (products[i].active && !products[i].soldOut)
      //         sendMessage = true;
      //     }

      //     if (product.soldOut != products[i].soldOut) {
      //       await this.redisService.ChangeSoldOutState('snipes', products[i]._id, products[i].soldOut);

      //       if (products[i].active && !products[i].soldOut)
      //         sendMessage = true;
      //     }          
      //   }

      //   if (sendMessage) {
      //     if (!monitors)
      //       monitors = await this.monitorModel.GetMonitors();

      //     for (let j = 0; j < monitors.length; j++) {
      //       if (monitors[j].webHook)
      //         await this.discordService.SendMessage({ 
      //           monitor: monitors[j], 
      //           product: product,
      //           page: 'Snipes'
      //         });
      //     }
      //   }
      // }

      // for (let i = 0; i < oldProducts.length; i++) {
      //   if (!productsStillAvailableStatus[i])
      //     await this.redisService.ChangeActiveState('snipes', oldProducts[i], false);
      // }
    
      await this.redisService.SetRunningState('snipes', false);
    }
    catch (e) {
      console.log('Fehler in SnipesMonitor.Run(): ', e);      
      await this.redisService.SetRunningState('snipes', false);
    }    
  }

  private async GetItems() {
    let items: Array<Product> = [];
    let url = 'https://www.snipes.com/c/shoes/topsneakerstyles?sz=1000'
    let response = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': GetRandomUserAgent()
      }
    });
    let soup = new JsSoup(await response.text());
    let productDivs = soup.findAll('div', 'b-product-tile');

    for (let i = 0; i < 1; i++) {
      let product = new Product();
      product.name = productDivs[i].find('span', 'b-product-tile-link').contents.toString().replace('\n', '');
      console.log(product.name);
    }

    return items;
  }
  
  private async Sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
}