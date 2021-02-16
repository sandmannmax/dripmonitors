import fetch, { Response } from 'node-fetch';
import { Product } from '../types/Product';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Proxy } from '../types/Proxy'

export class AfewMonitor {

  public static GetProducts = async function ({ proxy }: { proxy: Proxy }): Promise<Array<Product>> {
    let items: Array<Product> = [];
    let url = `https://afew-store.com/collections/sneakers/products.json/`
    let response: Response;
    try {
      response = await fetch(url, {
        method: 'GET',
        agent: new HttpsProxyAgent(proxy.address),
        headers: {
          'User-Agent': GetRandomUserAgent()
        }
      });
    } catch (e) {
      return null;
    }

    if (!response.ok) {
      logger.error('Error in AfewMonitor.GetItems() - Request to Afew failed with status code ' + response.status + ' - ' + response.statusText + '; Proxy: ' + proxy.address);
      return items;
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

        if (item.images.length > 0)
          product.img = item.images[0].src;

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
        logger.error('Error in AfewMonitor.GetItems(): ', e);
      }
    }

    return items;
  }  

}