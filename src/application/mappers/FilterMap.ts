import { Filter } from "../../domain/models/Filter";
import { FilterDTO } from "../dto/FilterDTO";

export class FilterMap {
  public static toDTO(filter: Filter): FilterDTO {
    return {
      value: filter.value
    };
  }
}
