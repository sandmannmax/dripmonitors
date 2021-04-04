import { IFilterRepo } from "../../domain/repos/IFilterRepo";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { MonitorJobContentDTO } from "../dto/MonitorJobContentDTO";
import { PriceDTO } from "../dto/PriceDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { BaseMonitor } from "./BaseMonitor";

export class AfewMonitor extends BaseMonitor {
  constructor(scraperService: IScraperService, productRepo: IProductRepo, filterRepo: IFilterRepo, notificationService: INotificationService) {
    super('afew', scraperService, productRepo, filterRepo, notificationService);
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
    const objects = JSON.parse(content).products;
    
    for (let i = 0; i < objects.length; i++) {
      const product = this.getProduct(objects[i]);
      if (product != null) {
        products.push(product);
      }
    }

    return products;
  }

  private getProduct(object: any): ProductScrapedDTO | null {
    let img = '';
    if (object.images.length > 0) {
      img = object.images[0].src;
    }

    let price: PriceDTO | null = null;
    let sizes: SizeDTO[] = [];
    let active = false;

    for (let i = 0; i < object.variants.length; i++) {        
      if (price == null) {
        price = { value: Number.parseFloat(object.variants[i].price), currency: 'EUR' };
      }
      sizes.push({ value: object.variants[i].title, soldOut: !object.variants[i].available });
      if (active == false && object.variants[i].available) {
        active = true;
      }
    }

    if (price == null) {
      return null;
    }

    const product: ProductScrapedDTO = { 
      productId: this.monitorpageId + '_' + object.id.toString(),
      name: object.title,
      href: 'https://afew-store.com/products/' + object.handle,
      img,
      price,
      active,
      sizes
    };
    
    return product;
  }
}