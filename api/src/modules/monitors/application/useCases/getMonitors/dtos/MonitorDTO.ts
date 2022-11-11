import { NotificationTargetDTO } from "./NotificationTargetDTO";
import { RoleDTO } from "./RoleDTO";

export interface MonitorDTO {
  name: string;
  image: string;
  running: boolean;
  notificationTarget: NotificationTargetDTO;
  roles: RoleDTO[];
  monitorsource: string;
}