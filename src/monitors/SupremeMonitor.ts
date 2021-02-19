import fetch, { Response } from 'node-fetch';
import JsSoup from 'jssoup';
import { Product } from '../types/Product';
import { Proxy } from '../types/Proxy';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
import { logger } from '../logger';

export class SupremeMonitor {

  public static GetProducts = async function ({ proxy }: { proxy: Proxy }): Promise<Array<Product>> {
    let items: Array<Product> = [];

    let url = 'https://www.supremenewyork.com/shop/all';
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
      logger.error('Error in SupremeMonitor.GetProducts() - Request to Supreme failed with status code ' + response.status + ' - ' + response.statusText + '; Proxy: ' + proxy.address);
      return null;
    }

    let html = await response.text();
    let soup = new JsSoup(html);
    let articles = soup.findAll('article');
    for (let i = 0; i < articles.length; i++) {
      let item = new Product();
      let href = articles[i].find('a').attrs.href;
      item.href = 'https://www.supremenewyork.com' + href;
      let img = articles[i].find('img').attrs.src;
      item.img = img;
      let parts = href.split('/');
      item.id = parts[parts.length - 2] + parts[parts.length - 1];
      item.active = true;
      item.soldOut = articles[i].text.toLowerCase() === 'sold out'
      item.sizes = [];
      item.sizesSoldOut = [];
      item.hasSizes = false;
      items.push(item);
    }
    return items;
  }

  public static ComplementProduct = async function ({ product, proxy }: { product: Product, proxy: Proxy }) {
    await SupremeMonitor.Sleep(1000);

    let response: Response;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      response = await fetch(product.href, {
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
      logger.error('Error in SupremeMonitor.ComplementProduct() - Request to Supreme failed with status code ' + response.status + ' - ' + response.statusText + '; Proxy: ' + proxy.address);
      return null;
    }

    let data = await response.text();
    let soup = new JsSoup(data);
    let elem = soup.findAll('p');
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].attrs.class.includes('price')) {
        let priceString = elem[i].findAll('span')[0].text;
        product.price = priceString.split('€')[1] + ' EUR'; 
      }
    }
    
    elem = soup.findAll('h1');
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
    product.name = name;

    return product;
  }
  
  private static Sleep = async function (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }   
}


