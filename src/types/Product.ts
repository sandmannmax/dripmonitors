import { Product } from "../models/Product";

export class Product_O {
  public id!: string;
  public name!: string;
}

export function GetProduct_O(product: Product): Product_O {
  let product_O: Product_O = new Product_O();
  product_O.id = product.id;
  product_O.name = product.name;
  return product_O;
}

export function GetProducts_O(products: Product[]): Product_O[] {
  let products_O = new Array<Product_O>();
  for (let i = 0; i < products.length; i++) {
    products_O.push(GetProduct_O(products[i]));
  }
  return products_O;
}