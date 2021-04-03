import { Filter } from "../../domain/models/Filter";
import { FilterDTO } from "../dto/FilterDTO";
import { IFilterRepo } from "../../domain/repos/IFilterRepo";
import { FilterMap } from "../mappers/FilterMap";
import { MonitorpageId } from "../../domain/models/MonitorpageId";

export interface IFiltersService {
  getFiltersByMonitorpageId({ monitorpageId }: { monitorpageId: string }): Promise<FilterDTO[]>;
  addFilter({ monitorpageId, filterValue }: { monitorpageId: string, filterValue: string }): Promise<FilterDTO>;
  deleteFilter({ filterId }: { filterId: string }): Promise<void>;
}

export class FiltersService implements IFiltersService {
  private readonly filterRepo: IFilterRepo;

  constructor(filterRepo: IFilterRepo) {
    this.filterRepo = filterRepo;
  }

  public async getFiltersByMonitorpageId({ monitorpageId }: { monitorpageId: string }): Promise<FilterDTO[]> {
    let filters = await this.filterRepo.getFiltersByMonitorpageId(monitorpageId);
    let filtersDTO: FilterDTO[] = [];

    for (let i = 0; i < filters.length; i++) {
      filtersDTO.push(FilterMap.toDTO(filters[i]));
    }

    return filtersDTO;
  }

  public async addFilter({ monitorpageId, filterValue }: { monitorpageId: string, filterValue: string }): Promise<FilterDTO> {
    let monitorpageIdObject = MonitorpageId.create({ value: monitorpageId });

    let filter = Filter.create({ value: filterValue, monitorpageId: monitorpageIdObject });

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