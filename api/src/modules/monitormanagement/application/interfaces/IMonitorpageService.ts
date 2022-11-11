import { MonitorpageUuid } from "../../domain/models/MonitorpageUuid";
import { MonitorpageDTO } from "../dto/MonitorpageDTO";

export interface IMonitorpageService {
  getMonitorpages(): Promise<MonitorpageDTO[]>;
  getMonitorpageByUuid(monitorpageUuid: MonitorpageUuid): Promise<MonitorpageDTO>;
}