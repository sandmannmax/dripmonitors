// import fetch from 'node-fetch';
// import JsSoup from 'jssoup';
// import { Product } from '../types/Product';
// import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
// import { logger } from '../logger';
// import { HttpsProxyAgent } from 'https-proxy-agent';
// import { ProxyModel } from '../models/ProxyModel';
// import puppeteer from 'puppeteer-extra';
// import StealthPlugin from 'puppeteer-extra-plugin-stealth';
// import useProxy from 'puppeteer-page-proxy';
// import config from '../config';

// puppeteer.use(StealthPlugin());

// export namespace FootLockerMonitor {

//   export async function Setup() {
//     const redisService = new RedisService();
//     redisService.SetRunningState('footlocker', false);
//   }

//   export async function Run(job) {
//     const redisService = new RedisService();

//     try {
//       if (await redisService.GetRunningState('footlocker'))
//         return;
    
//       await redisService.SetRunningState('footlocker', true);

//       let proxy = await ProxyModel.GetRandomProxy({ page: 'footlocker' });
//       let proxyString;

//       if (!proxy) {
//         logger.error(`FootLockerMonitor: No Proxy Available`);
//         await redisService.SetRunningState('footlocker', false);
//         return;
//       }

//       proxyString = proxy.address + ":" + proxy.port;
//       logger.debug(`FootLockerMonitor: Using proxy ${proxyString}`);

//       let products = await GetItems(proxyString);

//       if (products == null) {
//         await ProxyModel.SetCooldown({ page: 'footlocker', proxyId: proxy._id });
//         await redisService.SetRunningState('footlocker', false);
//         return;
//       }

//       await ProxyModel.ResetCooldown({ page: 'footlocker', proxyId: proxy._id });

//       let oldProducts = await redisService.GetProductIds('footlocker');
//       let productsStillAvailableStatus = new Array(oldProducts.length);
//       productsStillAvailableStatus = productsStillAvailableStatus.fill(false);

//       let monitors;
    
//       for (let i = 0; i < 5; i++) {
//         let index = oldProducts.indexOf(products[i]._id);
//         if (index != -1)
//           productsStillAvailableStatus[index] = true;

//         let product = await redisService.GetProduct('footlocker', products[i]._id);
//         let sendMessage = false;

//         if (product == null) {
//           let fullProduct = await GetFullProduct(products[i], proxyString);
//           logger.info(fullProduct.toValues());
//           if (fullProduct == null) {
//             await ProxyModel.SetCooldown({ page: 'footlocker', proxyId: proxy._id });
//             proxy = await ProxyModel.GetRandomProxy({ page: 'footlocker' });

//             if (!proxy) {
//               logger.error(`FootLockerMonitor: No Proxy Available`);
//               await redisService.SetRunningState('footlocker', false);
//               return;
//             }

//             proxyString = proxy.address + ":" + proxy.port;
//             logger.debug(`FootLockerMonitor: Using proxy ${proxyString}`);
//           } else {
//             products[i] = fullProduct;
//             await redisService.AddProduct('footlocker', products[i]);

//             if (products[i].active && !products[i].soldOut)
//               sendMessage = true;
//           }          
//         } else {
//           // TODO How to reload data without too much traffic
//           // await redisService.ChangeSizes('footlocker', products[i]._id, products[i].sizes, products[i].sizesSoldOut);

//           // if (product.active != products[i].active) {
//           //   await redisService.ChangeActiveState('footlocker', products[i]._id, products[i].active);

//           //   if (products[i].active && !products[i].soldOut)
//           //     sendMessage = true;
//           // }

//           // if (product.soldOut != products[i].soldOut) {
//           //   await redisService.ChangeSoldOutState('footlocker', products[i]._id, products[i].soldOut);

//           //   if (products[i].active && !products[i].soldOut)
//           //     sendMessage = true;
//           // }          
//         }

//         if (sendMessage) {
//           if (!monitors)
//             monitors = await MonitorModel.GetUserMonitors();

//           for (let j = 0; j < monitors.length; j++) {
//             // if (monitors[j].webHook)
//             //   await DiscordService.SendMessage({ 
//             //     monitor: monitors[j], 
//             //     product: products[i],
//             //     page: 'FootLocker'
//             //   });
//           }
//         }
//       }

//       for (let i = 0; i < oldProducts.length; i++) {
//         if (!productsStillAvailableStatus[i])
//           await redisService.ChangeActiveState('footlocker', oldProducts[i], false);
//       }
    
//       await redisService.SetRunningState('footlocker', false);
//     }
//     catch (e) {
//       logger.error('Error in FootLockerMonitor.Run(): ', e);      
//       await redisService.SetRunningState('footlocker', false);
//     }    
//   }
// }

// const GetItems = async (proxy) => {
//   let items: Array<Product> = [];
//   for (let i = 1; i < 2; i++) {
//     let url = `https://www.footlocker.de/de/herren/schuhe/?PageNumber=${i}`;
//     let content;
//     try {
//       const browser = await puppeteer.launch({ args: [ '--no-sandbox', '--disable-dev-shm-usage' ]});
//       const page = await browser.newPage();
//       await useProxy(page, proxy);
//       await page.goto(url);
//       await page.waitForSelector("div.fl-product-tile--container");
//       // await page.waitForTimeout(2000);
//       content = await page.content();
//       await browser.close();
//     } catch (e) {
//       logger.error(`FootLockerMonitor: Error with Proxy ${proxy} - ${e}`)
//       return null;
//     }  
//     let soup = new JsSoup(content);
//     let productDivs = soup.findAll('div', 'fl-product-tile--container');
//     try {
//       for (let j = 0; j < productDivs.length; j++) {
//         let noscriptSoup = new JsSoup(productDivs[i].find('noscript').contents.toString());
//         let href = noscriptSoup.find("a").attrs.href;
//         let name = noscriptSoup.find("span").contents[0]._text;
//         let nameStrings = name.split("-");
//         if (nameStrings != null && nameStrings.length == 2)
//           name = nameStrings[0];
//         if (name.substring(name.length - 1, name.length) == ' ')
//           name = name.substring(0, name.length - 1)
//         let params = href.split("?")[1].split("&");
//         let id;
//         for (let j = 0; j < params.length; j++) {
//           if (params[i]) {
//             let param = params[i].split("=");
//             if (param[0] == "v")
//               id = param[1];
//           }
//         }
//         let product: Product = new Product();
//         product._id = id;
//         product.active = true;
//         product.href = href;
//         product.name = name;
//         product.soldOut = false;
//         if (id)
//           items.push(product);
//       }
//     }
//     catch (e) {
//       logger.error('Error in FootLockerMonitor.GetItems(): ', e);
//     }     
//     Sleep(2000);
//   }
//   return items;
// }

// const GetFullProduct = async (product: Product, proxy: string) : Promise<Product> => {
//   await Sleep(1500);
//   let content;
//   try {    
//     const browser = await puppeteer.launch({ args: [ '--no-sandbox', '--disable-dev-shm-usage' ]});
//     const page = await browser.newPage();
//     await useProxy(page, proxy);
//     await page.goto(product.href);
//     await page.waitForSelector(".fl-product-size");
//     content = await page.content();
//     await browser.close();
//   } catch (e) {
//     logger.error(`FootLockerMonitor: Error with Proxy ${proxy} - ${e}`)
//     return null;
//   } 
//   let soup = new JsSoup(content);
//   product.sizes = [];
//   product.sizesSoldOut = [];
//   product.soldOut = true;
//   try {
//     let sizeDiv = soup.find('div', 'fl-product-size');
//     let buttons = sizeDiv.findAll('button');
//     for (let i = 0; i < buttons.length; i++) {
//       let span = buttons[i].find('span');
//       let classes: string = buttons[i].attrs.class;
//       if (span && classes) {
//         product.sizes.push(span.contents[0]._text);
//         let soldOut = classes.indexOf("not-available") != -1;
//         if (!soldOut && product.soldOut)
//           product.soldOut = false;
//         product.sizesSoldOut.push(soldOut);
//       }
//     }
//     let priceSpan = soup.find('span', 'fl-price--sale');
//     if (priceSpan) {
//       let metas = priceSpan.findAll('meta');
//       let price = '';
//       let currency = '';
//       for (let i = 0; i < metas.length; i++) {
//         if (metas[i].attrs.itemprop == 'priceCurrency')
//           currency = metas[i].attrs.content;
//         else if (metas[i].attrs.itemprop == 'price')
//           price = metas[i].attrs.content;
//       }
//       if (price) {
//         product.price = `${price} ${currency}`;
//       }
//     }
//     let imgDiv = soup.find('div', 'slick-active');
//     if (imgDiv) {
//       let img = imgDiv.find('img');
//       if (img) {
//         let src: string = img.attrs.src;
//         if (src.indexOf('&amp;fmt=png-alpha') != -1) {
//           src = src.replace('&amp;fmt=png-alpha', '');
//         }
//         if (src)
//           product.img = src;
//       }
//     }
//   }
//   catch (e) {
//     logger.error('Error in FootLockerMonitor.GetFullProduct(): ', e);
//   }
//   return product;   
// }

// const Sleep = async (ms) => {
//   return new Promise((resolve) => {
//     setTimeout(resolve, ms);
//   });
// }   

// // const Sim = async () => {
// //   // console.log("Start");
// //   // let p = new Product();
// //   // p._id = '314206188204';
// //   // p.href = 'https://www.footlocker.de/de/p/nike-air-max-95-essential-recycled-felt-herren-schuhe-123284?v=314206188204';
// //   // p.name = 'Nike Air Max 95 Essential Recycled Felt';
// //   // p = await GetFullProduct(p, 'http://127.0.0.1:6974');
// //   // console.log(p.toValues())
// //   // console.log("Finished");


// //   console.log("START")
// //   let url = `https://www.footlocker.de/de/herren/schuhe/?PageNumber=1`;
// //   let content;
// //   const browser = await launch({ args: [ '--no-sandbox', '--disable-dev-shm-usage' ]});
// //   const page = await browser.newPage();
// //   await page.goto(url);
// //   await page.waitForSelector("div.fl-product-tile--container");
// //   content = await page.content();
// //   await browser.close();
// //   let soup = new JsSoup(content);
// //   console.log(soup.findAll("div", "fl-product-tile--container").length)
// //   console.log("FINISHED")
// // }

// // Sim();