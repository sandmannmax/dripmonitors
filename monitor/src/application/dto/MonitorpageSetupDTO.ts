import { Uuid } from "../../core/base/Uuid";
import { IMonitorpageFunctionality } from "../../domain/interfaces/IMonitorpageFunctionality";
import { CountryCode } from "../../domain/models/CountryCode";
import { MonitorpageDisplayName } from "../../domain/models/MonitorpageDisplayName";
import { MonitorpageName } from "../../domain/models/MonitorpageName";

export interface MonitorpageSetupDTO {
  uuid: Uuid,
  monitorpageName: MonitorpageName,
  monitorpageDisplayName: MonitorpageDisplayName,
  monitorpageFunctionality: IMonitorpageFunctionality,
  cc: CountryCode,
  monitorAllProducts: boolean,
  showMonitorpageDisplayName: boolean,
}