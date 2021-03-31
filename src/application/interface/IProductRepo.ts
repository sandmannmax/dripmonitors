import { Product } from '../../core/entities/Product';

export interface IProductRepo {
  getProductById(id: string): Promise<Product | null>;
  getProductsByMonitorpageName(monitorpageName: string): Promise<Product[]>;
  exists(id: string): Promise<boolean>;
  save(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}