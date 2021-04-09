import { ProductDTO } from "../../application/dto/ProductDTO";
import { Product } from "../../proto/monitor/v1/monitor_pb";

export class ProductDTOToGrpcProduct {
  public static Map(product: ProductDTO): Product {
    let mappedProduct: Product = new Product;
    mappedProduct.setProductUuid(product.uuid);
    mappedProduct.setProductPageId(product.productPageId);
    mappedProduct.setName(product.name);
    mappedProduct.setHref(product.href);
    mappedProduct.setImg(product.img);
    mappedProduct.setMonitored(product.monitored);
    return mappedProduct;
  }

  public static MultiMap(products: ProductDTO[]): Product[] {
    let mappedProducts: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      mappedProducts.push(ProductDTOToGrpcProduct.Map(products[i]));
    }
    return mappedProducts;
  }
}