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
      serverUuid: ServerUuid.create(Uuid.create({ from: 'uuid', uuid: raw.server_uuid })),
      name: raw.name,
      image: ImageUrl.create({ value: raw.image }),
      running: raw.running,
      notificationTarget: NotificationTargetMap.toAggregate(raw),
      roles: raw.Roles.map((r: any) => RoleMap.toAggregate(r)),
      monitorsource: MonitorsourceUuid.create(Uuid.create({ from: 'uuid', uuid: raw.monitorsource_uuid })),
    }, Uuid.create({ from: 'uuid', uuid: raw.monitor_uuid }));
    
    return monitor;
  }

  public static toPersistence(monitor: Monitor): any {
    const raw: any = {
      monitor_uuid: monitor.uuid.toString(),
      server_uuid: monitor.serverUuid.uuid.toString(),
      name: monitor.name,
      image: monitor.image.value,
      running: monitor.running,
      webhook_id: monitor.notificationTarget.webhookId,
      webhook_token: monitor.notificationTarget.webhookToken,
      is_invalid: monitor.notificationTarget.isInvalid,
      monitorsource_uuid: monitor.monitorsource.uuid.toString(),
    };
    
    return raw;
  }
}