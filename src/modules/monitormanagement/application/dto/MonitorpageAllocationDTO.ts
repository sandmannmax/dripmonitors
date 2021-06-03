import { MonitorpageDTO } from "./MonitorpageDTO";

export interface MonitorpageAllocationDTO {
  monitorpageAllocationUuid: string;
  monitorpage: MonitorpageDTO;
  isFiltering: boolean;
  filters: string[];
}