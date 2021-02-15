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
      logger.error('Error in AfewMonitor.GetItems() - Request to Afew failed with status code ' + response.status + ' - ' + response.statusText);
      return items;
    }
    
    let json = await response.json();

    for (let i = 0; i < json.products.length; i++) {
      try {
        let product = new Product();
        let item = json.products[i];
  
        product.id = item.id;
        product.name = item.title;
        product.href = `https://afew-store.com/products/${item.handle}`;

        items.push(product);
      } catch (e) {
        logger.error('Error in AfewMonitor.GetItems(): ', e);
      }
    }

    return items;
  }  

}