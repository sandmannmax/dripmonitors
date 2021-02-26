import fetch, { Response } from 'node-fetch';
import { Product } from '../types/Product';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Proxy } from '../types/Proxy'
import JsSoup from 'jssoup';

export class ZalandoMonitor {

  public static GetProducts = async function ({ proxy }: { proxy: Proxy }): Promise<Array<Product>> {
    let items: Array<Product> = [];
    
    for (let i = 0; i < 3; i++) {
      let url = 'https://www.zalando.de/herrenschuhe-sneaker/?p=' + i;
  
      let response: Response;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      const userAgent = GetRandomUserAgent();
      try {
        response = await fetch(url, {
          method: 'GET',
          agent: new HttpsProxyAgent(proxy.address),
          headers: {
            'User-Agent': userAgent
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
      } catch (e) {
        clearTimeout(timeout);
        console.log('timeout');
      }
  
      if (!response.ok) {
        return null;
      }

      let text = await response.text();
      let soup = new JsSoup(text);
      let scripts = soup.findAll('script');
      
      let articles;

      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].attrs.id == 'z-nvg-cognac-props') {
          let content = scripts[i].contents[0]._text;
          content = content.substr(7, content.length - 9);
          let data = JSON.parse(content);
          articles = data[0].articles;
        }
      }

      if (!articles)
        logger.info('no articles ' + proxy.id + ' ' + userAgent);
      else {
        let hasSizes = false;
        for (let j = 0; j < articles.length; j++) {
          if (articles[j].sizes){
            hasSizes = true;
            logger.info(JSON.stringify(articles[j]));
          }
        }
        
        if (hasSizes) {
          for (let j = 0; j < articles.length; j++) {
            items.push(ZalandoMonitor.GetProduct(articles[j]));
            if (articles[j].family_articles.length > 1) {
              for (let k = 1; k < articles[j].family_articles.length; k++) {
                items.push(ZalandoMonitor.GetProduct(articles[j].family_articles[k]));
              }
            }
          }
        }  
      }
      

      ZalandoMonitor.Sleep(1000);
    }
    return items;
  }  

  private static GetProduct = function (article): Product {
    let product = new Product;
    product.id = 'zalando_' + article.sku;
    product.name = article.name;
    product.href = 'https://www.zalando.de/' + article.url_key + '.html';
    product.img = 'https://img01.ztat.net/article/' + article.media[0].path;
    let price = article.price.promotional;
    product.price = price.substr(0, price.length - 3).replace(',', '.') + ' EUR';
    product.active = true;
    product.sizes = [];
    product.sizesSoldOut = [];
    if (article.sizes) {
      product.hasSizes = true;
      product.sizes = article.sizes;
      product.soldOut = product.sizes.length == 0;
      for (let i = 0; i < product.sizes.length; i++)
        product.sizesSoldOut.push(false);
    } else {
      product.hasSizes = false;
      product.soldOut = false;
    }    
    return product;
  }

  private static Sleep = async function (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}

// async function Sim() {
//   let products: Array<Product> = [];

//   for (let i = 0; i < 3; i++) {
//     let url = 'https://www.zalando.de/herrenschuhe-sneaker/?p=' + i;

//     let response: Response;
//     const controller = new AbortController();
//     const timeout = setTimeout(() => controller.abort(), 10000);
//     // const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1';
//     const userAgent = GetRandomUserAgent();
//     try {
//       response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'User-Agent': userAgent
//         },
//         signal: controller.signal
//       });
//       clearTimeout(timeout);
//     } catch (e) {
//       clearTimeout(timeout);
//       console.log('timeout');
//     }

//     if (response.ok) {
//       let text = await response.text();
//       let soup = new JsSoup(text);
//       let scripts = soup.findAll('script');
      
//       let articles;

//       for (let i = 0; i < scripts.length; i++) {
//         if (scripts[i].attrs.id == 'z-nvg-cognac-props') {
//           let content = scripts[i].contents[0]._text;
//           content = content.substr(7, content.length - 9);
//           let data = JSON.parse(content);
//           articles = data[0].articles;
//         }
//       }

//       if (!articles)
//         console.log('no articles')
//       else if (!articles[0].sizes)
//         console.log('no sizes')
//       else {
//         for (let j = 0; j < articles.length; j++) {
//           products.push(GetProduct(articles[j]));
//           if (articles[j].family_articles.length > 1) {
//             for (let k = 1; k < articles[j].family_articles.length; k++) {
//               products.push(GetProduct(articles[j].family_articles[k]));
//             }
//           }
//         }
//       }      
//     } 
//     else {
//       console.log(response.status);
//     }
//   }
  
//   console.log(products.length);
// }

// function GetProduct(article): Product {
//   let product = new Product;
//   product.id = 'zalando_' + article.sku;
//   product.name = article.name;
//   product.href = 'https://www.zalando.de/' + article.url_key + '.html';
//   product.img = 'https://img01.ztat.net/article/' + article.media[0].path;
//   let price = article.price.promotional;
//   product.price = price.substr(0, price.length - 3).replace(',', '.') + ' EUR';
//   product.active = true;
//   product.hasSizes = true;
//   product.sizes = article.sizes;
//   product.soldOut = product.sizes.length == 0;
//   product.sizesSoldOut = [];
//   for (let i = 0; i < product.sizes.length; i++)
//     product.sizesSoldOut.push(false);
//   return product;
// }

// Sim();