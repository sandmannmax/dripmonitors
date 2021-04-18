import { Uuid } from "../../../../core/base/Uuid";
import { MonitorsourceDTO } from "../../../monitormanagement/application/dto/MonitorsourceDTO";
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
      isVisible: raw.is_visible,
      isSendingNotifications: raw.is_sending_notifications,
      monitorpageAllocations: raw.MonitorpageAllocations.map((m: any) => MonitorpageAllocationMap.toAggregate(m)),
    }, Uuid.create({ from: 'uuid', uuid: raw.monitorsource_uuid }));
    
    return monitorsource;
  }

  public static toPersistence(monitorsource: Monitorsource): any {
    const raw: any = {
      monitorsource_uuid: monitorsource.uuid.toString(),
      name: monitorsource.name,
      is_visible: monitorsource.isVisible,
      is_sending_notifications: monitorsource.isSendingNotifications,
    };
    
    return raw;
  }
}