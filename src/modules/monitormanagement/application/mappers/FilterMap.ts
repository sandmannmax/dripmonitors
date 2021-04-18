import { Uuid } from "../../../../core/base/Uuid";
import { Filter } from "../../domain/models/Filter";

export class FilterMap {

  public static toAggregate(raw: any): Filter {
    let filter = Filter.create({
      value: raw.value,
    }, Uuid.create({ from: 'uuid', uuid: raw.uuid }));
    
    return filter;
  }

  public static toPersistence(filter: Filter, monitorpageAllocationUuid: Uuid): any {
    const raw: any = {
      value: filter.value,
      monitorpageAllocationUuid: monitorpageAllocationUuid.toString(),
    };
    
    return raw;
  }
}