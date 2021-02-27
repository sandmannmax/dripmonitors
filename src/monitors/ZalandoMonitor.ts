import { Product } from '../types/Product';
import { logger } from '../logger';
import { Proxy } from '../types/Proxy'
import JsSoup from 'jssoup';
import { ScraperClientProvider } from '../provider/ScraperClientProvider';
import { GetHtmlRequest } from '../proto/scraper_pb';

export class ZalandoMonitor {

  public static GetProducts = async function ({ proxy }: { proxy: Proxy }): Promise<Array<Product>> {
    let items: Array<Product> = [];
    
    for (let i = 0; i < 3; i++) {
      let url = 'https://www.zalando.de/herrenschuhe-sneaker/?p=' + i;

      let text;

      try {
        text = await ZalandoMonitor.GetHtml({ url, proxy: proxy.address });
      }
      catch {
        logger.info('Error in ZalandoMonitor.GetProducts()');
        return null;
      }

      let soup = new JsSoup(text);
      let scripts = soup.findAll('script');
      
      let articles;

      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].attrs.id == 'z-nvg-cognac-props') {
          try {
            let content = scripts[i].getText()
            content = content.substr(7, content.length - 9);
            let data = JSON.parse(content);
            articles = data[0].articles;
          }
          catch { }
        }
      }

      if (!articles)
        logger.info('no articles ' + proxy.id + ' ');// + userAgent);
      else {
        let hasSizes = false;
        for (let j = 0; j < articles.length; j++) {
          if (articles[j].sizes){
            hasSizes = true;
            logger.info(JSON.stringify(articles[j]));
          }
        }
        
        logger.info('finished sizes ' + hasSizes);

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

  private static GetHtml = function ({ url, proxy }): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const client = ScraperClientProvider.getInstance();
  
      var request: GetHtmlRequest = new GetHtmlRequest();
      request.setUrl(url);
      request.setProxyAddress(proxy);
  
      client.getHtml(request, (error, response) => {
        if (error) reject(error)
        else resolve(response.getHtml());
      });
    });  
  }

  private static Sleep = async function (ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
}