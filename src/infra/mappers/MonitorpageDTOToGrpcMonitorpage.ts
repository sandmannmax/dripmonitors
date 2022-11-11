import { MonitorpageDTO } from "../../application/dto/MonitorpageDTO";
import { Monitorpage } from "../../proto/monitor/v1/monitor_pb";
import { FilterDTOToGrpcFilter } from "./FilterDTOToGrpcFilter";
import { UrlDTOToGrpcFilter } from "./UrlDTOToGrpcUrl";

export class MonitorpageDTOToGrpcMonitorpage {
  public static Map(monitorpage: MonitorpageDTO): Monitorpage {
    const mappedMonitorpage: Monitorpage = new Monitorpage();
    mappedMonitorpage.setMonitorpageUuid(monitorpage.monitorpageUuid);
    mappedMonitorpage.setMonitorpageName(monitorpage.monitorpageName);
    mappedMonitorpage.setMonitorpageDisplayName(monitorpage.monitorpageDisplayName);
    mappedMonitorpage.setIntervalTime(monitorpage.intervalTime);
    mappedMonitorpage.setUrlsList(UrlDTOToGrpcFilter.MultiMap(monitorpage.urls));
    mappedMonitorpage.setFiltersList(FilterDTOToGrpcFilter.MultiMap(monitorpage.filters));
    return mappedMonitorpage;
  }

  public static MultiMap(monitorpages: MonitorpageDTO[]): Monitorpage[] {
    let mappedMonitorpages: Monitorpage[] = [];
    for (let i = 0; i < monitorpages.length; i++) {
      mappedMonitorpages.push(MonitorpageDTOToGrpcMonitorpage.Map(monitorpages[i]));
    }
    return mappedMonitorpages;
  }
}