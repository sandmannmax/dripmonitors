import { Filter } from "../../core/entities/Filter";
import { FilterRequestDTO } from "../dto/FilterRequestDTO";
import { IFilterRepo } from "../interface/IFilterRepo";
import { FilterMap } from "../mappers/FilterMap";

export class FiltersService {
  private readonly filterRepo: IFilterRepo;

  constructor(filterRepo: IFilterRepo) {
    this.filterRepo = filterRepo;
  }

  public async getFiltersByMonitorpageName({ monitorpageName }: { monitorpageName: string }): Promise<FilterRequestDTO[]> {
    let filters = await this.filterRepo.getFiltersByMonitorpageName(monitorpageName);
    let filtersDTO: FilterRequestDTO[] = [];

    for (let i = 0; i < filters.length; i++) {
      filtersDTO.push(FilterMap.toDTO(filters[i]));
    }

    return filtersDTO;
  }

  public async addFilter({ monitorpageName, filterValue }: { monitorpageName: string, filterValue: string }): Promise<FilterRequestDTO> {
    let filter = Filter.create({ value: filterValue });

    await this.filterRepo.save(filter);

    return FilterMap.toDTO(filter);
  }

  public async deleteFilter({ filterId }: { filterId: string }): Promise<void> {
    let filterExists = await this.filterRepo.exists(filterId);
    if (filterExists) {
      await this.filterRepo.delete(filterId);
    }  
  }
}