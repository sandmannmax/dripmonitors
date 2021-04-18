import { MonitorpageUuid } from "../../domain/models/MonitorpageUuid";
import { MonitorpageDTO } from "../dto/MonitorpageDTO";

export interface IMonitorpageService {
  getMonitorpageByUuid(monitorpageUuid: MonitorpageUuid): MonitorpageDTO;
}