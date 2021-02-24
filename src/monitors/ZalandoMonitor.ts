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

async function Sim() {
  let products: Array<Product> = [];

  for (let i = 0; i < 3; i++) {
    let url = 'https://www.zalando.de/herrenschuhe-sneaker/?p=' + i;

    let response: Response;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    // const userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/69.0.3497.105 Mobile/15E148 Safari/605.1';
    const userAgent = GetRandomUserAgent();
    try {
      response = await fetch(url, {
        method: 'GET',
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

    if (response.ok) {
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
        console.log('no articles')
      else if (!articles[0].sizes)
        console.log('no sizes')
      else {
        for (let j = 0; j < articles.length; j++) {
          products.push(GetProduct(articles[j]));
          if (articles[j].family_articles.length > 1) {
            for (let k = 1; k < articles[j].family_articles.length; k++) {
              products.push(GetProduct(articles[j].family_articles[k]));
            }
          }
        }
      }      
    } 
    else {
      console.log(response.status);
    }
  }
  
  console.log(products.length);
}

function GetProduct(article): Product {
  let product = new Product;
  product.id = 'zalando_' + article.sku;
  product.name = article.name;
  product.href = 'https://www.zalando.de/' + article.url_key + '.html';
  product.img = 'https://img01.ztat.net/article/' + article.media[0].path;
  let price = article.price.promotional;
  product.price = price.substr(0, price.length - 3).replace(',', '.') + ' EUR';
  product.active = true;
  product.hasSizes = true;
  product.sizes = article.sizes;
  product.soldOut = product.sizes.length == 0;
  product.sizesSoldOut = [];
  for (let i = 0; i < product.sizes.length; i++)
    product.sizesSoldOut.push(false);
  return product;
}

// Sim();