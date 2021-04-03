import { ProductDTO } from "../../application/dto/ProductDTO";
import { Product } from "../../proto/monitor/v1/monitor_pb";

export class ProductRequestDTOToGrpcProduct {
  public static Map(product: ProductDTO): Product {
    let mappedProduct: Product = new Product;
    mappedProduct.setId(product.id);
    mappedProduct.setName(product.name);
    mappedProduct.setHref(product.href);
    mappedProduct.setImg(product.img);
    mappedProduct.setMonitored(product.monitored);
    return mappedProduct;
  }

  public static MultiMap(products: ProductDTO[]): Product[] {
    let mappedProducts: Product[] = [];
    for (let i = 0; i < products.length; i++) {
      mappedProducts.push(ProductRequestDTOToGrpcProduct.Map(products[i]));
    }
    return mappedProducts;
  }
}