import { IProductRepo } from "../../domain/repos/IProductRepo";
import { NotifySubjectDTO } from "../dto/NotifySubjectDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import cheerio from 'cheerio';
import { BaseMonitor } from "./BaseMonitor";
import { RunMonitorpageCommandDTO } from "../../domain/interfaces/IMonitorpageFunctionality";
import { CountryCode } from "../../domain/models/CountryCode";
import { Uuid } from "../../core/base/Uuid";
import { MonitorpageName } from "../../domain/models/MonitorpageName";

export class SupremeMonitor extends BaseMonitor {
  constructor(monitorpageUuid: Uuid, monitorpageName: MonitorpageName, productRepo: IProductRepo, scraperService: IScraperService,  notificationService: INotificationService) {
    super(monitorpageUuid, monitorpageName, productRepo, scraperService, notificationService);
  }

  protected async updateMonitoredProducts(productsScraped: ProductScrapedDTO[], command: RunMonitorpageCommandDTO): Promise<void> {
    let products = await this.productRepo.getProductsByMonitorpageUuid(this.monitorpageUuid);

    products = products.filter(p => p.monitored === true);
    
    for (let i = 0; i < products.length; i++) {
      let product = products[i];
      let productScraped = productsScraped.find(p => p.productPageId === product.productPageId.value);

      if (productScraped == undefined) {
        this.logger.warn('product not scraped.');
      } else {
        let complementedProduct = await this.complementProduct(productScraped, command.cc);

        if (complementedProduct != null) {
          product.updateMonitoredPropertiesFromScraped(complementedProduct);

          if (product.shouldNotify) {
            let notifySubject: NotifySubjectDTO = product.createNotifySubject()
            await this.notificationService.notify(notifySubject);
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

  protected async scrapeProducts(command: RunMonitorpageCommandDTO): Promise<ProductScrapedDTO[]> {
    let products: ProductScrapedDTO[] = [];

    for (let i = 0; i < command.urls.length; i++) {
      let scrapeResponse = await this.scraperService.scrape({ url: command.urls[i].value, cc: command.cc.value, isHtml: true });

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
        productPageId: '',
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
      product.productPageId = this.monitorpageName.value + '_' + parts[parts.length - 2] + parts[parts.length - 1];
      product.href = `https://www.supremenewyork.com${href}`;
      const img = 'https:' + $('img', article)[0].attribs.src;
      product.img = img;

      if (product != null) {
        products.push(product);
      }
    }

    return products;
  }

  private async complementProduct(product: ProductScrapedDTO, cc: CountryCode): Promise<ProductScrapedDTO | null> {
    let scrapeResponse = await this.scraperService.scrape({ url: product.href, cc: cc.value, isHtml: true });

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

    const sizeSelect = $('select#size');

    const sizes: SizeDTO[] = [];

    if (sizeSelect.length != 0) {
      const sizesScraped = sizeSelect.children();

      sizesScraped.each((i, size) => {
        sizes.push({ value: $(size).text(), soldOut: false });
      });
    } else {
      const addButton = $('#add-remove-buttons > input.button');

      if (addButton.length != 0) {
        sizes.push({ value: 'No-Size', soldOut: false });
      }
    }
    

    product.sizes = sizes;

    return product;
  };
}