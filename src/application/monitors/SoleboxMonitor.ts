import { IFilterRepo } from "../../domain/repos/IFilterRepo";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { RunMonitorCommandDTO } from "../dto/RunMonitorCommandDTO";
import { NotifySubjectDTO } from "../dto/NotifySubjectDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { BaseMonitor } from "./BaseMonitor";
import cheerio from 'cheerio';

export class SoleboxMonitor extends BaseMonitor {
  constructor(scraperService: IScraperService, productRepo: IProductRepo, filterRepo: IFilterRepo, notificationService: INotificationService) {
    super('solebox', scraperService, productRepo, filterRepo, notificationService);
  }

  public async run(command: RunMonitorCommandDTO): Promise<void> {
    this.logger.info('Starteddddd.');

    try {
      let products = await this.scrapeProducts(command);

      if (products.length > 0) {
        let p = await this.complementProduct(products[0], command.proxy);
      }

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
    const productDivs = $('div.b-product-tile');

    if (productDivs.length > 0) {
      for (let i = 0; i < productDivs.length; i++) {
        const dataString = productDivs[i].attribs['data-gtm'];
        const data = JSON.parse(dataString);
        const link = $('a.b-product-tile-body-link:first', productDivs[i]);
        const href = link.attr().href;
        const img = $('picture.b-dynamic-image-wrapper > source:first', productDivs[i]).attr()['data-srcset'];
        const imgSrc = img.split(', ')[0];

        const product: ProductScrapedDTO = {
          productId: this.monitorpageId + '_' + data.id,
          name: data.name,
          href: 'https://www.solebox.com' + href,
          img: imgSrc
        };

        products.push(product);
      }
    }
    
    return products;
  }

  private async complementProduct(product: ProductScrapedDTO, proxy: string): Promise<ProductScrapedDTO | null> {
    let scrapeResponse = await this.scraperService.scrape({ url: product.href, proxy, isHtml: true });

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