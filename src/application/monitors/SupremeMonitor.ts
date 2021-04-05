import { IFilterRepo } from "../../domain/repos/IFilterRepo";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { RunMonitorCommandDTO } from "../dto/RunMonitorCommandDTO";
import { NotifySubjectDTO } from "../dto/NotifySubjectDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import cheerio from 'cheerio';
import { BaseMonitor } from "./BaseMonitor";

export class SupremeMonitor extends BaseMonitor {
  constructor(scraperService: IScraperService, productRepo: IProductRepo, filterRepo: IFilterRepo, notificationService: INotificationService) {
    super('supreme-eu', scraperService, productRepo, filterRepo, notificationService);
  }

  protected async updateMonitoredProducts(productsScraped: ProductScrapedDTO[], command: RunMonitorCommandDTO): Promise<void> {
    let products = await this.productRepo.getProductsByMonitorpageId(this.monitorpageId);

    products = products.filter(p => p.monitored === true);
    
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let productScraped = productsScraped.find(p => p.productId === product.productId);

      if (productScraped == undefined) {
        this.logger.warn('product not scraped.');
      } else {
        let complementedProduct = await this.complementProduct(productScraped, command.proxy);

        if (complementedProduct != null) {
          product.updateMonitoredPropertiesFromScraped(complementedProduct);

          if (product.shouldNotify) {
            let notifySubject: NotifySubjectDTO = product.createNotifySubject()
            await this.notificationService.notify(notifySubject, command.targets);
          }

          if (product.shouldSave) {
            this.productRepo.save(product);
          }
        } else {
          this.logger.warn('product could not be complemented.');
        }  
      }
    }
  }

  protected async scrapeProducts(command: RunMonitorCommandDTO): Promise<ProductScrapedDTO[]> {
    let products: ProductScrapedDTO[] = [];

    for (let i = 0; i < command.urls.length; i++) {
      let scrapeResponse = await this.scraperService.scrape({ url: command.urls[i], proxy: command.proxy, isHtml: true });

      if (scrapeResponse.proxyError) {
        this.logger.info('Proxy Error.');
      }

      let productsScraped;

      if (!!scrapeResponse.statusCode && scrapeResponse.statusCode == 200 && scrapeResponse.content)
        productsScraped = await this.getProducts(scrapeResponse.content);

      if (productsScraped)  
        products.push(...productsScraped);
    }

    return products;
  }

  private getProducts(content: string): Array<ProductScrapedDTO> {
    const products: Array<ProductScrapedDTO> = [];
    const $ = cheerio.load(content);
    const articles = $('article');
    for (let i = 0; i < articles.length; i++) {
      const product: ProductScrapedDTO = { 
        productId: '',
        name: '',
        href: '',
        img: '',
      };

      let article = articles[i];

      const nameLink = $('h1 > a.name-link:first', article);
      const name = nameLink.text();
      const color = $('p > a.name-link:first', article).text();
      product.name = name + ' ' + color;

      const href = nameLink.attr().href;
      const parts = href.split('/');
      product.productId = this.monitorpageId + '_' + parts[parts.length - 2] + parts[parts.length - 1];
      product.href = `https://www.supremenewyork.com${href}`;
      const img = 'https:' + $('img', article)[0].attribs.src;
      product.img = img;

      if (product != null) {
        products.push(product);
      }
    }

    return products;
  }

  private async complementProduct(product: ProductScrapedDTO, proxy: string): Promise<ProductScrapedDTO | null> {
    let scrapeResponse = await this.scraperService.scrape({ url: product.href, proxy, isHtml: true });

    if (scrapeResponse.statusCode == undefined || (scrapeResponse.statusCode != 302 && scrapeResponse.statusCode != 200) || scrapeResponse.content == undefined) {
      return null;
    }

    if (scrapeResponse.statusCode == 302) {
      product.active = false;
      return product;
    }

    const $ = cheerio.load(scrapeResponse.content);
    const price = $('p.price:first');
    const priceString = $('span:first', price).text();
    const value = Number.parseFloat(priceString.replace('€', ''));
    product.price = { value, currency: 'EUR' };

    product.active = true;

    const sizesScraped = $('select#size').children();
    const sizes: SizeDTO[] = [];

    sizesScraped.each((i, size) => {
      sizes.push({ value: $(size).text(), soldOut: false });
    });

    product.sizes = sizes;

    return product;
  };
}