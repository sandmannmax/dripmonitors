import fetch, { Response } from 'node-fetch';
import { Product } from '../types/Product';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Proxy } from '../types/Proxy'

export class AfewMonitor {

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
          logger.error('Error in AfewMonitor.GetProducts(): ', e);
        }
      }
    }    

    return items;
  }  

}