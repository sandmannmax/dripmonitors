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

  CreateProduct(): Product {
    return Product.build({ id: this.id, name: this.id, monitorpageId: this.monitorpageId, soldOut: this.soldOut, active: this.active, hasSizes: this.hasSizes});
  }
}