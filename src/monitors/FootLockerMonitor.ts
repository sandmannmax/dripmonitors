import fetch from 'node-fetch';
import JsSoup from 'jssoup';
import { Product } from '../types/Product';
import { MonitorModel } from '../models/Monitor';
import { DiscordService } from '../services/DiscordService';
import { RedisService } from '../services/RedisService';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Container } from 'typedi';
import { ProxyModel } from '../models/Proxy';
import { launch } from 'puppeteer-core';

export namespace FootLockerMonitor {

  export async function Setup({ redisService } : { redisService: RedisService }) {
    redisService.SetRunningState('footlocker', false);
  }

  export async function Run(job) {
    const redisService = Container.get(RedisService);

    try {
      if (await redisService.GetRunningState('footlocker'))
        return;
    
      await redisService.SetRunningState('footlocker', true);

      const proxy = await ProxyModel.GetRandomProxy({ page: 'footlocker' });
      let proxyString;

      if (proxy) {
        proxyString = proxy.address + ":" + proxy.port;
        logger.info(`Using proxy ${proxyString}`);

      } else
        logger.warn(`No Proxy Available`);
    
      let products = await GetItems(proxyString);

      let oldProducts = await redisService.GetProductIds('footlocker');
      let productsStillAvailableStatus = new Array(oldProducts.length);
      productsStillAvailableStatus = productsStillAvailableStatus.fill(false);

      let monitors;
    
      // for (let i = 0; i < products.length; i++) {
      //   let index = oldProducts.indexOf(products[i]._id);
      //   if (index != -1)
      //     productsStillAvailableStatus[index] = true;

      //   let product = await redisService.GetProduct('footlocker', products[i]._id);
      //   let sendMessage = false;

      //   if (product == null) {
      //     await redisService.AddProduct('footlocker', products[i]);

      //     if (products[i].active && !products[i].soldOut)
      //       sendMessage = true;
      //   } else {
      //     await redisService.ChangeSizes('footlocker', products[i]._id, products[i].sizes, products[i].sizesSoldOut);

      //     if (product.active != products[i].active) {
      //       await redisService.ChangeActiveState('footlocker', products[i]._id, products[i].active);

      //       if (products[i].active && !products[i].soldOut)
      //         sendMessage = true;
      //     }

      //     if (product.soldOut != products[i].soldOut) {
      //       await redisService.ChangeSoldOutState('footlocker', products[i]._id, products[i].soldOut);

      //       if (products[i].active && !products[i].soldOut)
      //         sendMessage = true;
      //     }          
      //   }

      //   if (sendMessage) {
      //     if (!monitors)
      //       monitors = await MonitorModel.GetUserMonitors();

      //     for (let j = 0; j < monitors.length; j++) {
      //       if (monitors[j].webHook)
      //         await DiscordService.SendMessage({ 
      //           monitor: monitors[j], 
      //           product: products[i],
      //           page: 'FootLocker'
      //         });
      //     }
      //   }
      // }

      // for (let i = 0; i < oldProducts.length; i++) {
      //   if (!productsStillAvailableStatus[i])
      //     await redisService.ChangeActiveState('footlocker', oldProducts[i], false);
      // }
    
      await redisService.SetRunningState('footlocker', false);
    }
    catch (e) {
      logger.error('Error in FootLockerMonitor.Run(): ', e);      
      await redisService.SetRunningState('footlocker', false);
    }    
  }
}

const GetItems = async (proxy) => {
  let items: Array<Product> = [];
  for (let i = 1; i < 11; i++) {
    let url = `https://www.footlocker.de/de/herren/schuhe/?PageNumber=${i}`;
    let response = await fetch(url, {
      method: 'GET',
      agent: new HttpsProxyAgent(proxy),
      headers: {
        'User-Agent': GetRandomUserAgent()
      }
    });
    let soup = new JsSoup(await response.text());
    let productDivs = soup.findAll('div', 'fl-product-tile--container');
    try {
      for (let j = 0; j < productDivs.length; j++) {
        let noscriptSoup = new JsSoup(productDivs[i].find('noscript').contents.toString());
        let href = noscriptSoup.find("a").attrs.href;
        let name = noscriptSoup.find("span").contents[0]._text;
        let nameStrings = name.split("-");
        if (nameStrings != null && nameStrings.length == 2)
          name = nameStrings[0];
        if (name.substring(name.length - 1, name.length) == ' ')
          name = name.substring(0, name.length - 1)
        let params = href.split("?")[1].split("&");
        let id;
        for (let j = 0; j < params.length; j++) {
          let param = params[i].split("=");
          if (param[0] == "v")
            id = param[1];
        }
        let product: Product = new Product();
        product._id = id;
        product.active = true;
        product.href = href;
        product.name = name;
        product.soldOut = false;
        items.push(product);
      }
    }
    catch (e) {
      logger.error('Error in FootLockerMonitor.GetItems(): ', e);
    }     
    Sleep(1000);
  }
  return items;
}

const GetFullProduct = async (product: Product) : Promise<Product> => {
  // let response = await fetch(product.href, {
  //   method: 'GET',
  //   headers: {
  //     'User-Agent': GetRandomUserAgent()
  //   }
  // });
  // let response = await fetch(product.href, {
  //   method: 'GET',
  //   agent: new HttpsProxyAgent(proxy),
  //   headers: {
  //     'User-Agent': GetRandomUserAgent()
  //   }
  // });
  const browser = await launch();
  const page = await browser.newPage();
  await page.goto(product.href);
  await page.waitForSelector(".fl-product-size");
  const content = await page.content();
  let soup = new JsSoup(content);
  try {
    let sizeDiv = soup.findAll('div', 'fl-product-size');
    console.log(sizeDiv.length);
  }
  catch (e) {
    logger.error('Error in FootLockerMonitor.GetFullProduct(): ', e);
  }  
  return product;   
}

const Sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   

const Sim = async () => {
  console.log("Start");
  let p = new Product();
  p._id = '314206188204';
  p.href = 'https://www.footlocker.de/de/p/nike-air-max-95-essential-recycled-felt-herren-schuhe-123284?v=314206188204';
  p.name = 'Nike Air Max 95 Essential Recycled Felt';
  p = await GetFullProduct(p);
  console.log("Finished");
}

Sim();