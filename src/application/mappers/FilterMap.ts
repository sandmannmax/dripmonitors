import { Filter } from "../../core/entities/Filter";
import { Monitorpage } from "../../core/entities/Monitorpage";
import { FilterRequestDTO } from "../dto/FilterRequestDTO";

export class FilterMap {
  public static toDTO(filter: Filter): FilterRequestDTO {
    let id = filter.id;
    let value = filter.value;
    return { id, value };
  }

  public static toAggregate(raw: any): Filter | null {
    let monitorpageOrError = Monitorpage.create({
      name: raw.monitorpageName
    });

    if (monitorpageOrError.isFailure) return null;

    let filterOrError = Filter.create({
      value: raw.value,
      monitorpage: monitorpageOrError.getValue()
    })
    
    return filterOrError.isSuccess ? filterOrError.getValue() : null;    
  }

  public static toPersistence(filter: Filter): any {
    let raw: any = {};
    raw.value = filter.value;  
    raw.monitorpageName = filter.monitorpage.name;
    return raw;
  }
}