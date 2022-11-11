import { Uuid } from "../../../../core/base/Uuid";
import { Monitorsource } from "../models/Monitorsource";

export interface IMonitorsourceRepo {
  getMonitorsources(): Promise<Monitorsource[]>;
  getMonitorsourceByUuid(monitorsourceUuid: Uuid): Promise<Monitorsource>;
  exists(monitorsourceUuid: Uuid): Promise<boolean>;
  save(monitorsource: Monitorsource): Promise<void>;
  delete(monitorsource: Monitorsource): Promise<void>;
}