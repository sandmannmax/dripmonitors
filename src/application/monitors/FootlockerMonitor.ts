import { Uuid } from "../../core/base/Uuid";
import { RunMonitorpageCommandDTO } from "../../domain/interfaces/IMonitorpageFunctionality";
import { CountryCode } from "../../domain/models/CountryCode";
import { MonitorpageName } from "../../domain/models/MonitorpageName";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { NotifySubjectDTO } from "../dto/NotifySubjectDTO";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { BaseMonitor } from "./BaseMonitor";

export class FootlockerMonitor extends BaseMonitor {
  constructor(monitorpageUuid: Uuid, monitorpageName: MonitorpageName, productRepo: IProductRepo, scraperService: IScraperService, notificationService: INotificationService) {
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
      let scrapeResponse = await this.scraperService.scrape({ url: command.urls[i].value, cc: command.cc.value, jsRendering: false });

      if (scrapeResponse.proxyError) {
        this.logger.info('Proxy Error.');
      }

      let productsScraped;

      if (!!scrapeResponse.statusCode && scrapeResponse.statusCode == 200 && !!scrapeResponse.content)
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
      const productWithVariants = this.getProductWithVariants(objects[i]);
      products.push(...productWithVariants);
    }

    return products;
  }

  private getProductWithVariants(object: any): ProductScrapedDTO[] {
    let productWithVariants: ProductScrapedDTO[] = [];

    productWithVariants.push({ 
      productPageId: this.monitorpageName.value + '_' + object.sku,
      name: object.name,
      href: 'https://www.footlocker.de/de/product/~/' + object.sku + '.html',
      img: 'https://images.footlocker.com/is/image/FLEU/' + object.sku + '_01?wid=585&hei=585&fmt=png-alpha',
    });

    for (let i = 0; i < object.variantOptions; i++) {
      const variantSku = object.variantOptions[i].sku;
      productWithVariants.push({ 
        productPageId: this.monitorpageName.value + '_' + variantSku,
        name: object.name,
        href: 'https://www.footlocker.de/de/product/~/' + variantSku + '.html',
        img: 'https://images.footlocker.com/is/image/FLEU/' + variantSku + '_01?wid=585&hei=585&fmt=png-alpha',
      });
    }
    
    return productWithVariants;
  }

  private async complementProduct(product: ProductScrapedDTO, cc: CountryCode): Promise<ProductScrapedDTO | null> {
    const sku = product.productPageId.split('_')[1];
    const url = 'https://www.footlocker.de/api/products/pdp/' + sku;

    let scrapeResponse = await this.scraperService.scrape({ url, cc: cc.value, jsRendering: false });

    if (scrapeResponse.statusCode == undefined || (scrapeResponse.statusCode != 400 && scrapeResponse.statusCode != 200) || scrapeResponse.content == undefined) {
      return null;
    }

    if (scrapeResponse.statusCode == 400) {
      product.active = false;
      return product;
    }

    const object = JSON.parse(scrapeResponse.content);
    const variantIndex = object.variantAttributes.findIndex((v: any) => v.sku === sku);

    if (variantIndex === -1) {
      product.active = false;
    } else {
      product.active = true;

      if (object.variantAttributes[variantIndex].skuLaunchDate != undefined && object.variantAttributes[variantIndex].skuLaunchDate != null) {
        const launchDate = Date.parse(object.variantAttributes[variantIndex].skuLaunchDate);
        if (!Number.isNaN(launchDate) && Date.now() < launchDate) {
          product.active = false;
        }
      }

      product.price = { value: object.variantAttributes[variantIndex].price.value, currency: object.variantAttributes[variantIndex].price.currencyIso };
      product.sizes = [];

      const styleCode = object.variantAttributes[variantIndex].code;

      for (let i = 0; i < object.sellableUnits.length; i++) {
        let attributeIndex = object.sellableUnits[i].attributes.findIndex((a: any) => a.id === styleCode);

        if (attributeIndex != -1) {
          let size = object.sellableUnits[i].attributes.find((a: any) => a.type === 'size');

          if (!!size) {
            product.sizes.push({ value: size.value, soldOut: object.sellableUnits[i].stockLevelStatus !== 'inStock' });
          }
        }
      }
    }
    
    return product;
  };
}