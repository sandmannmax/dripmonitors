import { Uuid } from "../../../../core/base/Uuid";
import { ImageUrl } from "../../domain/models/ImageUrl";
import { Monitor } from "../../domain/models/Monitor";
import { MonitorDTO } from "../useCases/getMonitors/dtos/MonitorDTO";
import { NotificationTargetMap } from "./NotificationTargetMap";
import { RoleMap } from "./RoleMap";
import { ServerUuid } from "../../../users/domain/models/ServerUuid";
import { MonitorsourceUuid } from "../../../monitormanagement/domain/models/MonitorsourceUuid";

export class MonitorMap {
  public static toDTO(monitor: Monitor, monitorsource: string): MonitorDTO {
    return {
      name: monitor.name,
      image: monitor.image.value,
      running: monitor.running,
      notificationTarget: NotificationTargetMap.toDTO(monitor.notificationTarget),
      roles: RoleMap.toDTOBulk(monitor.roles),
      monitorsource,
    };
  }

  public static toAggregate(raw: any): Monitor {
    let monitor = Monitor.create({
      serverUuid: ServerUuid.create(Uuid.create({ from: 'uuid', uuid: raw.serverUuid })),
      name: raw.name,
      image: ImageUrl.create({ value: raw.image }),
      running: raw.running,
      notificationTarget: NotificationTargetMap.toAggregate(raw),
      roles: raw.Roles.map((r: any) => RoleMap.toAggregate(r)),
      monitorsource: MonitorsourceUuid.create(Uuid.create({ from: 'uuid', uuid: raw.monitorsourceUuid })),
    }, Uuid.create({ from: 'uuid', uuid: raw.uuid }));
    
    return monitor;
  }

  public static toPersistence(monitor: Monitor): any {
    const raw: any = {
      serverUuid: monitor.serverUuid.uuid.toString(),
      name: monitor.name,
      image: monitor.image.value,
      running: monitor.running,
      webhookId: monitor.notificationTarget.webhookId,
      webhookToken: monitor.notificationTarget.webhookToken,
      isInvalid: monitor.notificationTarget.isInvalid,
      monitorsourceUuid: monitor.monitorsource.uuid.toString(),
    };
    
    return raw;
  }
}