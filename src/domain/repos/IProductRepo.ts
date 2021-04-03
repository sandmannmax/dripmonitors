import { Product } from '../models/Product';

export interface IProductRepo {
  getProductById(id: string): Promise<Product>;
  getProductsByMonitorpageId(monitorpageId: string): Promise<Product[]>;
  exists(id: string): Promise<boolean>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}