import { IProductRepo } from "../../domain/repos/IProductRepo";
import { NotifySubjectDTO } from "../dto/NotifySubjectDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { BaseMonitor } from "./BaseMonitor";
import cheerio from 'cheerio';
import { RunMonitorpageCommandDTO } from "../../domain/interfaces/IMonitorpageFunctionality";
import { CountryCode } from "../../domain/models/CountryCode";
import { Uuid } from "../../core/base/Uuid";
import { MonitorpageName } from "../../domain/models/MonitorpageName";

export class SnipesMonitor extends BaseMonitor {
  constructor(monitorpageUuid: Uuid, monitorpageName: MonitorpageName, productRepo: IProductRepo, scraperService: IScraperService,  notificationService: INotificationService) {
    super(monitorpageUuid, monitorpageName, productRepo, scraperService, notificationService);
  }

  public async run(command: RunMonitorpageCommandDTO): Promise<void> {
    this.logger.info('Starteds.');

    try {
      let products = await this.scrapeProducts(command);

      // if (products.length > 0) {
      //   let p = await this.complementProduct(products[0], command.proxy);
      // }

      // if (products.length == 0) {
      //   this.logger.info('No Products retreived.');
      //   return;
      // }

      // await this.updateProducts(products, command);
      // await this.updateMonitoredProducts(products, command);
    } catch (error) {
      this.logger.error(error);
    }
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

      if (!!scrapeResponse.statusCode && scrapeResponse.statusCode == 200 && !!scrapeResponse.content) {
        productsScraped = await this.getProducts(scrapeResponse.content);
      } else {
        if (!!scrapeResponse.error)
          this.logger.info(scrapeResponse.error);
        if (!!scrapeResponse.statusCode)
          this.logger.info(scrapeResponse.statusCode.toString());
      }

      if (productsScraped)  
        products.push(...productsScraped);
    }

    return products;
  }

  private getProducts(content: string): Array<ProductScrapedDTO> {
    const products: Array<ProductScrapedDTO> = [];

    const $ = cheerio.load(content);
    const productDivs = $('div.b-product-grid-tile');

    if (productDivs.length > 0) {
      // for (let i = 0; i < productDivs.length; i++) {
      for (let i = 0; i < 1; i++) {
        const dataString = productDivs[i].attribs['data-gtm'];
        const data = JSON.parse(dataString);
        const link = $('a.b-product-tile-image-link:first', productDivs[i]);
        const href = link.attr().href;
        const img = $('picture.b-dynamic-image-wrapper > source:first', productDivs[i]).attr()['data-srcset'];
        const imgSrc = img.split(', ')[0];

        const product: ProductScrapedDTO = {
          productPageId: this.monitorpageName.value + '_' + data.id,
          name: data.name,
          href: 'https://www.snipes.com' + href,
          img: imgSrc
        };

        this.logger.info(product);
        // products.push(product);
      }
    }
    
    return products;
  }

  private async complementProduct(product: ProductScrapedDTO, cc: CountryCode): Promise<ProductScrapedDTO | null> {
    let scrapeResponse = await this.scraperService.scrape({ url: product.href, cc: cc.value, isHtml: true });

    if (scrapeResponse.proxyError) {
      this.logger.info('Proxy Error.');
    }

    if (!!scrapeResponse.statusCode && scrapeResponse.statusCode == 503) {
      this.logger.info('Cloudflare...');
      return null;
    }

    if (scrapeResponse.statusCode == undefined || scrapeResponse.statusCode != 200 || scrapeResponse.content == undefined) {
      this.logger.info('null')
      return null;
    }

    const $ = cheerio.load(scrapeResponse.content);

    const sizesWrapper = $('div.b-pdp-attribute--size:first');
    const sizes = $('div.b-swatch-value-wrapper', sizesWrapper);

    this.logger.info(sizes.length.toString());
    
    return product;
  };
}