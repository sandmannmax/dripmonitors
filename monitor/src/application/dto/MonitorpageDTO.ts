import { FilterDTO } from "./FilterDTO";
import { UrlDTO } from "./UrlDTO";

export interface MonitorpageDTO {
  monitorpageUuid: string,
  monitorpageName: string,
  monitorpageDisplayName: string,
  intervalTime: number;
  filters: FilterDTO[];
  urls: UrlDTO[];
}