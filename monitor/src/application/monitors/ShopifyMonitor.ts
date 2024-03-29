import { Uuid } from "../../core/base/Uuid";
import { RunMonitorpageCommandDTO } from "../../domain/interfaces/IMonitorpageFunctionality";
import { MonitorpageName } from "../../domain/models/MonitorpageName";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { PriceDTO } from "../dto/PriceDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { BaseMonitor } from "./BaseMonitor";

export class ShopifyMonitor extends BaseMonitor {
  constructor(monitorpageUuid: Uuid, monitorpageName: MonitorpageName, productRepo: IProductRepo, scraperService: IScraperService,  notificationService: INotificationService) {
    super(monitorpageUuid, monitorpageName, productRepo, scraperService, notificationService);
  }

  protected async scrapeProducts(command: RunMonitorpageCommandDTO): Promise<ProductScrapedDTO[]> {
    let products: ProductScrapedDTO[] = [];

    for (let i = 0; i < command.urls.length; i++) {
      let scrapeResponse = await this.scraperService.scrape({ url: command.urls[i].value, cc: command.cc.value, jsRendering: false });

      if (scrapeResponse.proxyError) {
        this.logger.info('Proxy Error.');
      }

      let productsScraped;

      if (!!scrapeResponse.statusCode && scrapeResponse.statusCode === 200 && !!scrapeResponse.content)
        productsScraped = await this.getProducts(scrapeResponse.content);

      if (productsScraped)  
        products.push(...productsScraped);
    }

    return products;
  }

  private getProducts(content: string): Array<ProductScrapedDTO> {
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
      productPageId: this.monitorpageName.value + '_' + object.id.toString(),
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