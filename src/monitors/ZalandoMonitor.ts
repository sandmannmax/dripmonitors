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
    for (let page = 1; page < 7; page++) {
      let url = `https://afew-store.com/collections/sneakers/products.json?page=${page}`
      let response: Response;
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 10000);
      try {
        response = await fetch(url, {
          method: 'GET',
          agent: new HttpsProxyAgent(proxy.address),
          headers: {
            'User-Agent': GetRandomUserAgent()
          },
          signal: controller.signal
        });
        clearTimeout(timeout);
      } catch (e) {
        clearTimeout(timeout);
        return null;
      }

      if (!response.ok) {
        if (response.status != 403) {
          logger.error('Error in AfewMonitor.GetProducts() - Request to Afew failed with status code ' + response.status + ' - ' + response.statusText + '; Proxy: ' + proxy.address);
        }
        return null;
      }
      
      let json = await response.json();

      for (let i = 0; i < json.products.length; i++) {
        try {
          let product = new Product();
          let item = json.products[i];
    
          product.id = item.id.toString() + 'afew';
          product.name = item.title;
          product.href = `https://afew-store.com/products/${item.handle}`;
          product.sizes = [];
          product.sizesSoldOut = [];
          product.active = false;
          product.soldOut = true;
          product.price = '';
          product.hasSizes = true;

          if (item.images.length > 0)
            product.img = item.images[0].src;
          else
            product.img = ''

          item.variants.forEach(variant => {
            if (product.price === '')
              product.price = variant.price + ' EUR';
            
            product.sizes.push(variant.title);
            product.sizesSoldOut.push(!variant.available);

            if (variant.available) {
              product.active = true;
              product.soldOut = false;
            }
          });

          items.push(product);
        } catch (e) {
          logger.error('Error in ZalandoMonitor.GetProducts(): ', e);
        }
      }
    }    

    return items;
  }  

}

// async function Sim() {
//   let url = 'https://www.zalando.de/herrenschuhe-sneaker/';
//   let response: Response;
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 10000);
//   const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1'; //GetRandomUserAgent();
//   console.log(userAgent);
//   let products: Array<Product> = [];
//   try {
//     response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         'User-Agent': userAgent
//       },
//       signal: controller.signal
//     });
//     clearTimeout(timeout);
//   } catch (e) {
//     clearTimeout(timeout);
//     console.log('timeout');
//   }

//   if (response.ok) {
//     let text = await response.text();
//     let soup = new JsSoup(text);
//     let articles = soup.findAll('article');
//     if (articles.length == 0) {
//       return;
//     }

//     for (let i = 0; i < articles.length; i++) {
//       let h3Tag = articles[i].find('h3');
//       let imgTag = articles[i].find('img');
//       let spanTag = articles[i].find('span', 'cMfkVL');
//       if (h3Tag && imgTag && spanTag) {
//         let product = new Product();
//         product.hasSizes = false;
//         product.name = h3Tag.previousElement._text + ' ' + h3Tag.contents[0]._text;
//         product.img = imgTag.attrs.src;
//         product.href = 'https://zalando.de' + articles[i].find('a').attrs.href;
//         let price = spanTag.contents[spanTag.contents.length - 1]._text;
//         price = price.substr(0, price.length - 2).replace(',', '.') + ' EUR';
//         product.price = price;
//         products.push(product);
//       }
//     }
//     console.log(JSON.stringify(await ComplementProduct({ product: products[0]})));
//   } 
//   else {
//     console.log(response.status);
//   }
// }

// async function ComplementProduct({ product }: { product: Product }) {
//   let response: Response;
//   const controller = new AbortController();
//   const timeout = setTimeout(() => controller.abort(), 10000);
//   const userAgent = GetRandomUserAgent();
//   console.log(userAgent)
//   try {
//     response = await fetch(product.href, {
//       method: 'GET',
//       headers: {
//         'User-Agent': userAgent
//       },
//       signal: controller.signal
//     });
//     clearTimeout(timeout);
//   } catch (e) {
//     clearTimeout(timeout);
//     return null;
//   }

//   if (!response.ok) {
//     // logger.error('Error in SupremeMonitor.ComplementProduct() - Request to Supreme failed with status code ' + response.status + ' - ' + response.statusText + '; Proxy: ' + proxy.address);
//     console.log('Error in complement Product')
//     return null;
//   }

//   let data = await response.text();
//   // console.log(data);
//   let soup = new JsSoup(data);
//   let elem = soup.findAll('form');

//   console.log(elem.length);

//   for (let i = 0; i < elem.length; i++) {
//     console.log(elem[i]);
//   } 

//   return product;
// }

// Sim();