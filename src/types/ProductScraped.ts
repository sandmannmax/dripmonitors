import { Product } from "../models/Product";
import { SizeScraped } from "./SizeScraped";

export class ProductScraped {
  public id!: string;
  public name!: string;
  public monitorpageId!: string;
  public href!: string;
  public img!: string;
  public price!: string;
  public active!: boolean;
  public soldOut!: boolean;
  public hasSizes!: boolean;
  public sizes!: SizeScraped[];

  static CreateProduct(productScraped: ProductScraped): Product {
    return Product.build({ id: productScraped.id, name: productScraped.name, monitorpageId: productScraped.monitorpageId, soldOut: productScraped.soldOut, active: productScraped.active, hasSizes: productScraped.hasSizes});
  }
}