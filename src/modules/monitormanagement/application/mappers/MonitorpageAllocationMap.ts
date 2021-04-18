import { Uuid } from "../../../../core/base/Uuid";
import { MonitorpageAllocation } from "../../domain/models/MonitorpageAllocation";
import { MonitorpageUuid } from "../../domain/models/MonitorpageUuid";
import { MonitorpageAllocationDTO } from "../dto/MonitorpageAllocationDTO";
import { MonitorpageDTO } from "../dto/MonitorpageDTO";
import { FilterMap } from "./FilterMap";

export class MonitorpageAllocationMap {
  public static toDTO(monitorpageAllocation: MonitorpageAllocation, monitorpage: MonitorpageDTO): MonitorpageAllocationDTO {
    return {
      monitorpage,
      isFiltering: monitorpageAllocation.isFiltering,
      filters: monitorpageAllocation.filters.map(f => f.value),
    };
  }

  public static toAggregate(raw: any): MonitorpageAllocation {
    let monitorpageAllocation = MonitorpageAllocation.create({
      monitorpageUuid: MonitorpageUuid.create(Uuid.create({ from: 'uuid', uuid: raw.monitorpageUuid })),
      isFiltering: raw.isFiltering,
      filters: raw.Filters.map((f: any) => FilterMap.toAggregate(f)),
    }, Uuid.create({ from: 'uuid', uuid: raw.uuid }));
    
    return monitorpageAllocation;
  }

  public static toPersistence(monitorpageAllocation: MonitorpageAllocation, monitorUuid: Uuid): any {
    const raw: any = {
      isFiltering: monitorpageAllocation.isFiltering,
      monitorpageUuid: monitorpageAllocation.monitorpageUuid.uuid.toString(),
      monitorUuid: monitorUuid.toString(),
    };
    
    return raw;
  }
}