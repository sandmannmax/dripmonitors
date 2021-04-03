import { FilterDTO } from "../../application/dto/FilterDTO";
import { Filter } from "../../proto/monitor/v1/monitor_pb";

export class FilterRequestDTOToGrpcFilter {
  public static Map(filter: FilterDTO): Filter {
    let mappedFilter: Filter = new Filter;
    mappedFilter.setId(filter.id.toValue().toString());
    mappedFilter.setValue(filter.value);
    return mappedFilter;
  }

  public static MultiMap(filters: FilterDTO[]): Filter[] {
    let mappedFilters: Filter[] = [];
    for (let i = 0; i < filters.length; i++) {
      mappedFilters.push(FilterRequestDTOToGrpcFilter.Map(filters[i]));
    }
    return mappedFilters;
  }
}