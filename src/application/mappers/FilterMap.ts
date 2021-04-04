import { UniqueEntityID } from "../../core/base/UniqueEntityID";
import { Filter } from "../../domain/models/Filter";
import { MonitorpageId } from "../../domain/models/MonitorpageId";
import { logger } from "../../util/logger";
import { FilterDTO } from "../dto/FilterDTO";

export class FilterMap {
  public static toDTO(filter: Filter): FilterDTO {
    let id = filter.id.toValue().toString();
    let value = filter.value;
    let monitorpageId = filter.monitorpageId.value;
    return { id, value, monitorpageId };
  }

  public static toAggregate(raw: any, id: string): Filter {
    let monitorpageId = MonitorpageId.create({
      value: raw.monitorpageId
    });

    return Filter.create({
      value: raw.value,
      monitorpageId
    }, new UniqueEntityID(id));  
  }

  public static toPersistence(filter: Filter): any {
    let raw: any = {};
    raw.value = filter.value;  
    raw.monitorpageId = filter.monitorpageId.value;
    return raw;
  }
}