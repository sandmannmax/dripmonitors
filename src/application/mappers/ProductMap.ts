import { UniqueEntityID } from "../../core/base/UniqueEntityID";
import { MonitorpageId } from "../../domain/models/MonitorpageId";
import { Price } from "../../domain/models/Price";
import { Product } from "../../domain/models/Product";
import { Size } from "../../domain/models/Size";
import { logger } from "../../util/logger";
import { ProductDTO } from "../dto/ProductDTO";

export class ProductMap {
  public static toDTO(product: Product): ProductDTO {
    let id = product.id.toValue().toString();
    let productId = product.productId;
    let name = product.name;
    let href = product.href;
    let img = product.img;
    let monitored = product.monitored;
    return { id, productId, name, href, img, monitored };
  }

  public static toAggregate(raw: any, id?: UniqueEntityID): Product {
    let monitorpageId = MonitorpageId.create({
      value: raw.monitorpageId
    });

    let price;

    if (raw.priceValue) {
      price = Price.create({ value: Number.parseFloat(raw.priceValue), currency: raw.priceCurrency });
    }

    let sizes: Size[] | undefined = ProductMap.getSizes({ sizesPersistence: raw.sizes });

    let product = Product.create({
      productId: raw.productId,
      name: raw.name,
      href: raw.href,
      img: raw.img,
      monitorpageId: monitorpageId,
      monitored: raw.monitored === '1',
      price,
      active: !!raw.active ? raw.active === '1' : undefined,
      sizes
    }, id);
    
    return product;    
  }

  public static toPersistence(product: Product): { productPersistence: any, sizesPersistence?: any } {
    let result: { productPersistence: any, sizesPersistence?: any } = {
      productPersistence: {}
    };
    result.productPersistence.productId = product.productId;
    result.productPersistence.name = product.name;
    result.productPersistence.href = product.href;
    result.productPersistence.img = product.img;
    result.productPersistence.monitored = product.monitored ? '1' : '0';
    result.productPersistence.monitorpageId = product.monitorpageId.value;
    if (!!product.active)
      result.productPersistence.active = product.active ? '1' : '0';
    if (!!product.price) {
      result.productPersistence.priceValue = product.price.value.toFixed(2);
      result.productPersistence.priceCurrency = product.price.currency;
    }
    if (!!product.sizes && product.sizes.length > 0) {
      result.sizesPersistence = {};
      for (let i = 0; i < product.sizes.length; i++) {
        result.sizesPersistence[product.sizes[i].value] = product.sizes[i].soldOut ? '1' : '0';
      }
    }
    return result;
  }

  private static getSizes({ sizesPersistence }: { sizesPersistence: any }): Size[] | undefined {
    if (!!sizesPersistence) {
      let sizes: Size[] = [];
      for (let key in sizesPersistence) {
        let size = Size.create({
          value: key,
          soldOut: sizesPersistence[key] === '1'
        });
        sizes.push(size);
      }
      return sizes;
    } else {
      return undefined;
    }
  }
}