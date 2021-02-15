import fetch, { Response } from 'node-fetch';
import { Product } from '../types/Product';
import { GetRandomUserAgent } from '../provider/RandomUserAgentProvider';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Proxy } from '../types/Proxy'

export class NikeMonitor {

  public static GetProducts = async function ({ proxy }: { proxy: Proxy }): Promise<Array<Product>> {
    let items: Array<Product> = [];
    let location = 'DE';
    let language = 'de';
    for (let i = 0; i < 180; i += 60) {
      let url = `https://api.nike.com/product_feed/threads/v2/?anchor=${i}&count=60&filter=marketplace%28${location}%29&filter=language%28${language}%29&filter=channelId%28010794e5-35fe-4e32-aaff-cd2c74f89d61%29&filter=exclusiveAccess%28true%2Cfalse%29&fields=active%2Cid%2ClastFetchTime%2CproductInfo%2CpublishedContent.nodes%2CpublishedContent.subType%2CpublishedContent.properties.coverCard%2CpublishedContent.properties.productCard%2CpublishedContent.properties.products%2CpublishedContent.properties.publish.collections%2CpublishedContent.properties.relatedThreads%2CpublishedContent.properties.seo%2CpublishedContent.properties.threadType%2CpublishedContent.properties.custom%2CpublishedContent.properties.title`
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
        logger.error('Error in NikeMonitor.GetItems() - Request to Nike failed with status code ' + response.status + ' - ' + response.statusText + '; Proxy: ' + proxy.address);
        return items;
      }

      let json = await response.json();
      for (let j = 0; j < json.objects.length; j++) {
        if (json.objects[j].productInfo) {
          let name = `${json.objects[j].publishedContent.properties.title} ${json.objects[j].publishedContent.properties.coverCard.properties.title}`;
          let href = `https://www.nike.com/${location.toLowerCase()}/launch/t/${json.objects[j].publishedContent.properties.seo.slug}`;
          try {
            for (let k = 0; k < json.objects[j].productInfo.length; k++) {
              let productJson = json.objects[j].productInfo[k];
              let product: Product = new Product();
              product.id = productJson.merchProduct.id;
              product.active = productJson.merchProduct.status == 'ACTIVE';
              if (productJson.launchView) {
                let launchDate = new Date(productJson.launchView.startEntryDate);
                if (launchDate > new Date(Date.now()))
                  product.active = false;
              }
              product.href = productJson.productContent ? `https://www.nike.com/${location.toLowerCase()}/launch/t/${productJson.productContent.slug}` : href;
              product.img = productJson.imageUrls.productImageUrl;
              product.name = productJson.productContent ? productJson.productContent.fullTitle : name;
              product.price = `${productJson.merchPrice.currentPrice} ${productJson.merchPrice.currency}`;
              product.soldOut = !productJson.availability.available;
              product.sizes = [];
              product.sizesSoldOut = [];
              if (productJson.skus) {
                let skuIds = [];
                for (let l = 0; l < productJson.skus.length; l++) {
                  skuIds.push(productJson.skus[l].id);
                  product.sizes.push(productJson.skus[l].nikeSize);
                  product.sizesSoldOut.push(true);
                }
                if (productJson.availableSkus)
                for (let l = 0; l < productJson.availableSkus.length; l++) {
                  product.sizesSoldOut[skuIds.indexOf(productJson.availableSkus[l].id)] = !productJson.availableSkus[l].available;
                }
              }
              items.push(product);
            }
          }
          catch (e) {
            logger.error('Error in NikeMonitor.GetItems(): ', e);
          } 
        }         
      }

      Sleep(1000);
    }
    return items;
  }  

}

const Sleep = async (ms) => {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   