import { Uuid } from "../../../../core/base/Uuid";
import { MonitorsourceUuid } from "../../../monitormanagement/domain/models/MonitorsourceUuid";
import { Monitor } from "../models/Monitor";

export interface IMonitorRepo {
  getMonitors(userUuid: Uuid, serverUuid: Uuid): Promise<Monitor[]>;
  getMonitorsByMonitorsourceUuid(monitorsourceUuid: MonitorsourceUuid): Promise<Monitor[]>;
  getMonitorByUuid(userUuid: Uuid, serverUuid: Uuid, monitorUuid: Uuid): Promise<Monitor>;
  exists(monitorUuid: Uuid): Promise<boolean>;
  save(monitor: Monitor): Promise<void>;
}