import { Uuid } from "../../../../core/base/Uuid";
import { MonitorpageAllocation } from "../../domain/models/MonitorpageAllocation";
import { MonitorpageUuid } from "../../domain/models/MonitorpageUuid";
import { MonitorsourceUuid } from "../../domain/models/MonitorsourceUuid";
import { MonitorpageAllocationDTO } from "../dto/MonitorpageAllocationDTO";
import { MonitorpageDTO } from "../dto/MonitorpageDTO";
import { FilterMap } from "./FilterMap";

export class MonitorpageAllocationMap {
  public static toDTO(monitorpageAllocation: MonitorpageAllocation, monitorpage: MonitorpageDTO): MonitorpageAllocationDTO {
    return {
      monitorpageAllocationUuid: monitorpageAllocation.uuid.toString(),
      monitorpage,
      isFiltering: monitorpageAllocation.isFiltering,
      filters: monitorpageAllocation.filters.map(f => f.value),
    };
  }

  public static toAggregate(raw: any): MonitorpageAllocation {
    let monitorpageAllocation = MonitorpageAllocation.create({
      monitorpageUuid: MonitorpageUuid.create(Uuid.create({ from: 'uuid', uuid: raw.monitorpage_uuid })),
      isFiltering: raw.is_filtering,
      filters: raw.Filters.map((f: any) => FilterMap.toAggregate(f)),
    }, Uuid.create({ from: 'uuid', uuid: raw.monitorpage_allocation_uuid }));
    
    return monitorpageAllocation;
  }

  public static toPersistence(monitorpageAllocation: MonitorpageAllocation, monitorsourceUuid: Uuid): any {
    const raw: any = {
      monitorpage_allocation_uuid: monitorpageAllocation.uuid.toString(),
      is_filtering: monitorpageAllocation.isFiltering,
      monitorpage_uuid: monitorpageAllocation.monitorpageUuid.uuid.toString(),
      monitorsource_uuid: monitorsourceUuid.toString(),
    };
    
    return raw;
  }
}