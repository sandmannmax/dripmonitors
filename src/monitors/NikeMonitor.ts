import { Service } from 'typedi';
import { ScraperClientService } from '../services/ScraperClientService';
import { MonitorJobContent } from '../types/MonitorJobContent';
import { RedisService } from '../services/RedisService';
import { Product } from '../types/Product';
import { Size } from '../types/Size';

@Service()
export class NikeMonitor {
  private monitorpageName: string;

  constructor(
    private scraperClientService: ScraperClientService,
    private redisService: RedisService
  ) {
    this.monitorpageName = 'nike-de';
  }

  public async Run({ content }: { content: MonitorJobContent }) {
    const products: Product[] = [];

    for (let i = 0; i < content.urls.length; i++) {
      const webContent = await this.scraperClientService.Get({
        url: content.urls[i],
        proxy: content.proxy,
        isHtml: content.isHtml,
      });
      products.push(...this.GetProducts({ content: webContent }));
    }

    const productIds = await this.redisService.GetProductIds({
      monitorpageName: this.monitorpageName,
    });

    for (let i = 0; i < products.length; i++) {
      const index = productIds.indexOf(products[i].id);

      if (index == -1) {
        await this.redisService.AddProduct({
          monitorpageName: this.monitorpageName,
          product: products[i],
        });
      }
    }
  }

  private GetProducts({ content }: { content: string }): Array<Product> {
    const items: Array<Product> = [];
    const json = JSON.parse(content);
    for (let j = 0; j < json.objects.length; j++) {
      if (json.objects[j].productInfo) {
        const name = `${json.objects[j].publishedContent.properties.title} ${json.objects[j].publishedContent.properties.coverCard.properties.title}`;
        const href = `https://www.nike.com/de/launch/t/${json.objects[j].publishedContent.properties.seo.slug}`;
        for (let k = 0; k < json.objects[j].productInfo.length; k++) {
          const productJson = json.objects[j].productInfo[k];
          const product = this.GetProduct({ productJson, name, href });
          if (product != null) {
            items.push(product);
          }
        }
      }
    }
    return items;
  }

  private GetProduct({
    productJson,
    name,
    href,
  }: {
    productJson: any;
    name: string;
    href: string;
  }): Product | null {
    if (
      !productJson.merchProduct
      || !productJson.imageUrls
      || !productJson.merchPrice
      || !productJson.availability
      || !productJson.skus
      || !productJson.availableSkus
    )
      return null;

    const product: Product = new Product();
    product.name = name;
    product.href = href;
    product.id = productJson.merchProduct.id;
    if (productJson.productContent) {
      product.name = productJson.productContent.fullTitle;
      product.href = `https://www.nike.com/de/launch/t/${productJson.productContent.slug}`;
    }
    product.img = productJson.imageUrls.productImageUrl;
    product.price = `${productJson.merchPrice.currentPrice} ${productJson.merchPrice.currency}`;
    product.active = productJson.merchProduct.status == 'ACTIVE';
    if (productJson.launchView) {
      const launchDate = new Date(productJson.launchView.startEntryDate);
      if (launchDate > new Date(Date.now())) {
        product.active = false;
      }
    }
    product.soldOut = !productJson.availability.available;
    const sizes: Size[] = [];
    const skuIds = [];
    for (let l = 0; l < productJson.skus.length; l++) {
      skuIds.push(productJson.skus[l].id);
      sizes.push({ value: productJson.skus[l].nikeSize, soldOut: true });
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
