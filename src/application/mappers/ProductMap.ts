import { Uuid } from "../../core/base/Uuid";
import { Price } from "../../domain/models/Price";
import { Product } from "../../domain/models/Product";
import { ProductPageId } from "../../domain/models/ProductPageId";
import { Size } from "../../domain/models/Size";
import { ProductDTO } from "../dto/ProductDTO";

export class ProductMap {
  public static toDTO(product: Product): ProductDTO {
    return { 
      uuid: product.uuid.toString(), 
      productPageId: product.productPageId.value,
      name: product.name, 
      href: product.href, 
      img: product.img, 
      monitored: product.monitored,
    };
  }

  public static toAggregate(raw: any, uuid?: Uuid): Product {
    let price;

    if (raw.priceValue) {
      price = Price.create({ value: Number.parseFloat(raw.priceValue), currency: raw.priceCurrency });
    }

    let sizes: Size[] | undefined = ProductMap.getSizes({ sizesPersistence: raw.sizes });

    let product = Product.create({
      productPageId: ProductPageId.create({ value: raw.productPageId }),
      monitorpageUuid: Uuid.create({ uuid: raw.monitorpageUuid }),
      name: raw.name,
      href: raw.href,
      img: raw.img,
      monitored: raw.monitored === '1',
      price,
      active: !!raw.active ? raw.active === '1' : undefined,
      sizes
    }, uuid);
    
    return product;    
  }

  public static toPersistence(product: Product): { productPersistence: any, sizesPersistence?: any } {
    let result: { productPersistence: any, sizesPersistence?: any } = {
      productPersistence: {}
    };
    result.productPersistence.productPageId = product.productPageId.value;
    result.productPersistence.monitorpageUuid = product.monitorpageUuid.toString();
    result.productPersistence.name = product.name;
    result.productPersistence.href = product.href;
    result.productPersistence.img = product.img;
    result.productPersistence.monitored = product.monitored ? '1' : '0';
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