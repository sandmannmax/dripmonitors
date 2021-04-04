import { IFilterRepo } from "../../domain/repos/IFilterRepo";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { MonitorJobContentDTO } from "../dto/MonitorJobContentDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import cheerio from 'cheerio';
import { BaseMonitor } from "./BaseMonitor";

export class ZalandoMonitor extends BaseMonitor {
  constructor(scraperService: IScraperService, productRepo: IProductRepo, filterRepo: IFilterRepo, notificationService: INotificationService) {
    super('zalando-de', scraperService, productRepo, filterRepo, notificationService);
  }

  protected async scrapeProducts(content: MonitorJobContentDTO): Promise<ProductScrapedDTO[]> {
    let products: ProductScrapedDTO[] = [];

    for (let i = 0; i < content.urls.length; i++) {
      let scrapedContent = await this.scraperService.scrape({ url: content.urls[i], proxy: content.proxy, isHtml: content.isHtml });

      let productsScraped;

      if (scrapedContent.success && scrapedContent.content)
        productsScraped = await this.getProducts({ content: scrapedContent.content });

      if (productsScraped)  
        products.push(...productsScraped);
    }

    return products;
  }

  private getProducts({ content }: { content: string }): Array<ProductScrapedDTO> {
    const products: Array<ProductScrapedDTO> = [];
    const $ = cheerio.load(content);
    const script = $('script#z-nvg-cognac-props').toString();
    let objects = JSON.parse(script.substr(65, script.length - 77)).articles;

    for (let i = 0; i < objects.length; i++) {
      const product = this.getProduct(objects[i]);
      if (product != null) {
        products.push(product);
      }
    }

    return products;
  }

  private getProduct(object: any): ProductScrapedDTO | null {
    let priceString = object.price.promotional;
    const price = Number.parseFloat(priceString.substr(0, priceString.split('').length - 2).replace(',','.'))

    const sizes: SizeDTO[] = [];
    for (let i = 0; i < object.sizes.length; i++) {
      sizes.push({ value: object.sizes[i], soldOut: false });
    }

    const product: ProductScrapedDTO = { 
      productId: this.monitorpageId + '_' + object.sku,
      name: object['brand_name'] + ' ' + object.name,
      href: 'https://www.zalando.de/' + object['url_key'] + '.html',
      img: 'https://img01.ztat.net/article/' + object.media[0].path,
      price: { value: price, currency: 'EUR' },
      active: true,
      sizes,
    };

    return product;
  }
}