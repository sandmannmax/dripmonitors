import { Uuid } from '../../core/base/Uuid';
import { Monitorpage } from '../models/Monitorpage';

export interface IMonitorpageRepo {
  getMonitorpages(): Promise<Monitorpage[]>;
  getMonitorpageByUuid(monitorpageUuid: Uuid): Promise<Monitorpage>;
  exists(monitorpageId: Uuid): Promise<boolean>;
  save(monitorpage: Monitorpage): Promise<void>;
  isRunning(monitorpageId: Uuid): Promise<boolean>;
  startRunning(monitorpageId: Uuid): Promise<void>;
  stopRunning(monitorpageId: Uuid): Promise<void>;
}