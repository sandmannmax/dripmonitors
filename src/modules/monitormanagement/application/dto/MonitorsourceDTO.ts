import { MonitorpageAllocationDTO } from "./MonitorpageAllocationDTO";

export interface MonitorsourceDTO {
  name: string;
  monitorpageAllocations: MonitorpageAllocationDTO[];
  isSendingNotifications: boolean;
  isVisible: boolean;
}