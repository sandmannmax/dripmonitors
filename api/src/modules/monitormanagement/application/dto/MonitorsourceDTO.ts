import { MonitorpageAllocationDTO } from "./MonitorpageAllocationDTO";

export interface MonitorsourceDTO {
  uuid: string;
  name: string;
  monitorpageAllocations: MonitorpageAllocationDTO[];
  isSendingNotifications: boolean;
  isVisible: boolean;
}