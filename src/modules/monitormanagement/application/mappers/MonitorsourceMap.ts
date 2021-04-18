import { Uuid } from "../../../../core/base/Uuid";
import { MonitorsourceDTO } from "../../../monitormanagement/application/dto/MonitorsourceDTO";
import { MonitorpageAllocation } from "../../domain/models/MonitorpageAllocation";
import { Monitorsource } from "../../domain/models/Monitorsource";
import { MonitorpageAllocationDTO } from "../dto/MonitorpageAllocationDTO";
import { MonitorpageAllocationMap } from "./MonitorpageAllocationMap";

export class MonitorsourceMap {
  public static toDTO(monitorsource: Monitorsource, monitorpageAllocations: MonitorpageAllocationDTO[]): MonitorsourceDTO {
    return {
      name: monitorsource.name,
      monitorpageAllocations,
      isSendingNotifications: monitorsource.isSendingNotifications,
      isVisible: monitorsource.isVisible,
    };
  }

  public static toAggregate(raw: any): Monitorsource {
    let monitorsource = Monitorsource.create({
      name: raw.name,
      isVisible: raw.isVisible,
      isSendingNotifications: raw.isSendingNotifications,
      monitorpageAllocations: raw.MonitorpageAllocations.map((m: any) => MonitorpageAllocationMap.toAggregate(m)),
    }, Uuid.create({ from: 'uuid', uuid: raw.id }));
    
    return monitorsource;
  }

  public static toPersistence(monitorsource: Monitorsource): any {
    const raw: any = {
      name: monitorsource.name,
      isVisible: monitorsource.isVisible,
      isSendingNotifications: monitorsource.isSendingNotifications,
    };
    
    return raw;
  }
}