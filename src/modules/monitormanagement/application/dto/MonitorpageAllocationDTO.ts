import { MonitorpageDTO } from "./MonitorpageDTO";

export interface MonitorpageAllocationDTO {
  monitorpage: MonitorpageDTO;
  isFiltering: boolean;
  filters: string[];
}