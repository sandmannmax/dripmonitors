import fetch from 'node-fetch';
import JsSoup from 'jssoup';
import { Product } from '../types/Product';
import { MonitorModel } from '../model/Monitor';
import { DiscordService } from '../services/DiscordService';
import { RedisService } from '../services/RedisService';

export class SupremeMonitor {
  private monitorModel: MonitorModel;
  private discordService: DiscordService;
  private redisService: RedisService;

  constructor(monitorModel: MonitorModel, discordService: DiscordService, redisService: RedisService) {
    this.monitorModel = monitorModel;
    this.discordService = discordService;
    this.redisService = redisService;
  }

  async Setup() {
    this.redisService.SetRunningState('supreme', false);
  }

  async Run() {
    try {
      if (await this.redisService.GetRunningState('supreme'))
        return;
    
      await this.redisService.SetRunningState('supreme', true);
    
      let products = await this.GetItems();

      let oldProducts = await this.redisService.GetProductIds('supreme');
      let productsStillAvailableStatus = new Array(oldProducts.length);
      productsStillAvailableStatus = productsStillAvailableStatus.fill(false);
    
      for (let i = 0; i < products.length; i++) {
        productsStillAvailableStatus[oldProducts.indexOf(products[i]._id)] = true;

        let item = await this.redisService.GetProduct('supreme', products[i]._id);
    
        if (item == null) {
          products[i].name = await this.GetName(products[i].href);
          await this.redisService.AddProduct('supreme', products[i]);
        } else {
          let sendMessage = false;
          let oldSoldOutState = item.soldOut;
          if (oldSoldOutState != products[i].soldOut) {              
            await this.redisService.ChangeSoldOutState('supreme', products[i]._id, products[i].soldOut);
          }  
          if (item.active) {
            await this.redisService.ChangeActiveState('supreme', products[i]._id, true);            
            // if (!products[i].soldOut && await this.redisService.IsMonitoredProduct('supreme', products[i]._id)) {
            //   sendMessage = true;
            // }
          } else {
            if (oldSoldOutState != products[i].soldOut) {
              // if (!products[i].soldOut && await this.redisService.IsMonitoredProduct('supreme', products[i]._id)) {
              //   sendMessage = true;
              // }
            }  
          }  
          if (sendMessage) {
            let price = await this.GetPrice(products[i].href);
            // let users = await this.redisService.GetUserIdsMonitoringProduct('supreme', products[i]._id, price);
            // for (let j = 0; j < users.length; j++) {
            //   let monitor = await this.monitorModel.GetMonitor({ userId: users[j] });
            //   if (monitor && monitor.length == 1 && monitor[0].webHook) {
            //     await this.discordService.SendMessage({ monitor: monitor[0], shoeName: item.name, price, href: `https://www.supremenewyork.com${products[i].href}`});
            //   }
            // }
          }
        }
      }

      for (let i = 0; i < oldProducts.length; i++) {
        if (!productsStillAvailableStatus[i])
          await this.redisService.ChangeActiveState('supreme', oldProducts[i], false);
      }
    
      await this.redisService.SetRunningState('supreme', false);
    }
    catch (e) {
      console.log('Fehler in SupremeMonitor.Run(): ', e);      
      await this.redisService.SetRunningState('supreme', false);
    }    
  }

  private async GetItems() {
    let response = await fetch('https://www.supremenewyork.com/shop/all');
    let html = await response.text();
    let soup = new JsSoup(html);
    let articles = soup.findAll('article');
    let items: Array<Product> = []
    for (let i = 0; i < articles.length; i++) {
      let item = new Product();
      let href = articles[i].find('a').attrs.href;
      item.href = href;
      let parts = href.split('/');
      item._id = parts[parts.length - 2] + parts[parts.length - 1];
      item.active = true;
      item.soldOut = articles[i].text.toLowerCase() === 'sold out'
      items.push(item);
    }
    return items;
  }
  
  private async GetPrice(href) {
    await this.Sleep(5000);
    let result = await fetch('https://www.supremenewyork.com' + href);
    let data = await result.text();
    let soup = new JsSoup(data);
    let elem = soup.findAll('p');
    let price: number;
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].attrs.class.includes('price')) {
        let priceString = elem[i].findAll('span')[0].text;
        price = Number(priceString.split('€')[1]); 
      }
    }
    return price;
  }
  
  private async GetName(href) {
    await this.Sleep(5000);
    let result = await fetch('https://www.supremenewyork.com' + href);
    let data = await result.text();
    let soup = new JsSoup(data);
    let elem = soup.findAll('h1');
    let name = '';
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].attrs.class == 'protect')
        name += elem[i].text + ' - ';
    }
    elem = soup.findAll('p');
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].attrs.class.includes('protect'))
        name += elem[i].text;
    }
    return name;
  }  
  
  private async Sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
}


