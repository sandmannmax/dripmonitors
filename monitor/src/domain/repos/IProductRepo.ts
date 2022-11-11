import { Uuid } from '../../core/base/Uuid';
import { Product } from '../models/Product';

export interface IProductRepo {
  getProductByUuid(productUuid: Uuid): Promise<Product>;
  getProductsByMonitorpageUuid(monitorpageUuid: Uuid): Promise<Product[]>;
  exists(productUuid: Uuid): Promise<boolean>;
  save(product: Product): Promise<void>;
  delete(productUuid: Uuid): Promise<void>;
}