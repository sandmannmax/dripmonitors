import { Monitorpage } from "../../domain/models/Monitorpage";
import { MonitorpageDTO } from "../dto/MonitorpageDTO";

export class MonitorpageMap {
  public static toDTO(monitorpage: Monitorpage): MonitorpageDTO {
    return { 
      monitorpageUuid: monitorpage.uuid.toString(),
      monitorpageName: monitorpage.monitorpageName.value,
      monitorpageDisplayName: monitorpage.monitorpageDisplayName.value,
      intervalTime: monitorpage.intervalTime.value,
      filters: monitorpage.filters.map(f => f.value),
      urls: monitorpage.urls.map(u => u.value),
    };
  }
}