import { Filter } from '../../core/entities/Filter';

export interface IFilterRepo {
  getFilterById(id: string): Promise<Filter | null>;
  getFiltersByMonitorpageName(monitorpageName: string): Promise<Filter[]>;
  exists(id: string): Promise<boolean>;
  save(product: Filter): Promise<void>;
  delete(id: string): Promise<void>;
}