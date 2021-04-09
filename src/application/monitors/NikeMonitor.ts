import { Uuid } from "../../core/base/Uuid";
import { RunMonitorpageCommandDTO } from "../../domain/interfaces/IMonitorpageFunctionality";
import { MonitorpageName } from "../../domain/models/MonitorpageName";
import { IProductRepo } from "../../domain/repos/IProductRepo";
import { ProductScrapedDTO } from "../dto/ProductScrapedDTO";
import { SizeDTO } from "../dto/SizeDTO";
import { INotificationService } from "../interface/INotificationService";
import { IScraperService } from "../interface/IScraperService";
import { BaseMonitor } from "./BaseMonitor";

export class NikeMonitor extends BaseMonitor {
  constructor(monitorpageUuid: Uuid, monitorpageName: MonitorpageName, productRepo: IProductRepo, scraperService: IScraperService, notificationService: INotificationService) {
    super(monitorpageUuid, monitorpageName, productRepo, scraperService, notificationService);
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
    const json = JSON.parse(content);
    for (let j = 0; j < json.objects.length; j++) {
      if (json.objects[j].productInfo) {
        const name = `${json.objects[j].publishedContent.properties.title} ${json.objects[j].publishedContent.properties.coverCard.properties.title}`;
        const href = `https://www.nike.com/de/launch/t/${json.objects[j].publishedContent.properties.seo.slug}`;
        for (let k = 0; k < json.objects[j].productInfo.length; k++) {
          const productJson = json.objects[j].productInfo[k];
          const product = this.getProduct({ productJson, name, href });
          if (product != null) {
            products.push(product);
          }
        }
      }
    }
    return products;
  }

  private getProduct({
    productJson,
    name,
    href,
  }: {
    productJson: any;
    name: string;
    href: string;
  }): ProductScrapedDTO | null {
    if (
      !productJson.merchProduct
      || !productJson.imageUrls
      || !productJson.merchPrice
      || !productJson.availability
      || !productJson.skus
      || !productJson.availableSkus
    )
      return null;

    const product: ProductScrapedDTO = { 
      productPageId: this.monitorpageName.value + '_' + productJson.merchProduct.id,
      name,
      href,
      img: productJson.imageUrls.productImageUrl,
    };
    
    if (productJson.productContent) {
      product.name = productJson.productContent.fullTitle;
      product.href = `https://www.nike.com/de/launch/t/${productJson.productContent.slug}`;
    }

    product.price = { value: productJson.merchPrice.currentPrice, currency: productJson.merchPrice.currency };
    const status: string = productJson.merchProduct.status;
    product.active = (status.toLowerCase() === 'active');

    if (productJson.launchView) {
      const launchDate = new Date(productJson.launchView.startEntryDate);
      if (launchDate.getTime() > Date.now()) {
        product.active = false;
      }
    }

    const sizes: SizeDTO[] = [];
    const skuIds = [];
    for (let l = 0; l < productJson.skus.length; l++) {
      const atc = product.href + '?size=' + productJson.skus[l].nikeSize + '&productId=' + productJson.merchProduct.id;
      skuIds.push(productJson.skus[l].id);
      sizes.push({ value: productJson.skus[l].nikeSize, soldOut: true, atc });
    }
    for (let l = 0; l < productJson.availableSkus.length; l++) {
      sizes[
        skuIds.indexOf(productJson.availableSkus[l].id)
      ].soldOut = !productJson.availableSkus[l].available;
    }
    product.sizes = sizes;
    return product;
  }
}