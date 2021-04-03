import { Filter } from '../models/Filter';

export interface IFilterRepo {
  getFilterById(id: string): Promise<Filter>;
  getFiltersByMonitorpageId(monitorpageId: string): Promise<Filter[]>;
  exists(id: string): Promise<boolean>;
  save(product: Filter): Promise<void>;
  delete(id: string): Promise<void>;
}