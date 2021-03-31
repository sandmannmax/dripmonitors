import { Monitorpage } from "../../core/entities/Monitorpage";
import { Product } from "../../core/entities/Product";
import { Size } from "../../core/entities/Size";
import { ProductRequestDTO } from "../dto/ProductRequestDTO";

export class ProductMap {
  public static toDTO(product: Product): ProductRequestDTO {
    let id = product.id;
    let productId = product.productId;
    let name = product.name;
    let href = product.href;
    let img = product.img;
    let monitored = product.monitored;
    return { id, productId, name, href, img, monitored };
  }

  public static toAggregate(raw: any): Product | null {
    let monitorpageOrError = Monitorpage.create({
      name: raw.monitorpageName
    });
    let sizes: Size[] | undefined = ProductMap.getSizes({ sizesPersistence: raw.sizes });
    
    if (monitorpageOrError.isFailure) return null;

    let filterOrError = Product.create({
      productId: raw.productId,
      name: raw.name,
      href: raw.href,
      img: raw.img,
      monitorpage: monitorpageOrError.getValue(),
      monitored: raw.monitored === '1',
      price: !!raw.price ? raw.price : undefined,
      active: !!raw.active ? raw.active === '1' : undefined,
      soldOut: !!raw.soldOut ? raw.soldOut === '1' : undefined,
      sizes
    });
    
    return filterOrError.isSuccess ? filterOrError.getValue() : null;    
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
    result.productPersistence.monitorpage = product.monitorpage.name;
    if (!!product.active)
      result.productPersistence.active = product.active ? '1' : '0';
    if (!!product.soldOut)
      result.productPersistence.soldOut = product.soldOut ? '1' : '0';
    if (!!product.price)
      result.productPersistence.price = product.price;
    if (!!product.sizes) {
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
        let sizeOrError = Size.create({
          value: key,
          soldOut: sizesPersistence[key] === '1'
        });
        if (sizeOrError.isSuccess) sizes.push(sizeOrError.getValue());
      }
      return sizes;
    } else {
      return undefined;
    }
  }
}