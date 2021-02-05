import { GetMonitorpage_O, Monitorpage, Monitorpage_O } from "./Monitorpage";

export class Product_O {
  public id: string;
  public name: string;
  public monitorpage: Monitorpage_O;
}

export class Product {
  public id: string;
  public name: string;
  public monitorpageId: string;
  public href: string;
  public img: string;
  public price: string;
  public sizes: Array<string>;
  public sizesSoldOut: Array<boolean>;
  public soldOut: boolean;
  public active: boolean;
}

export function GetProduct_O(product: Product, monitorpage: Monitorpage): Product_O {
  if (product && monitorpage) {
    let product_O: Product_O = new Product_O();
    product_O.id = product.id;
    product_O.name = product.name;
    product_O.monitorpage = GetMonitorpage_O(monitorpage);
    return product_O;
  } else
    return undefined;
}