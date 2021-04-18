import { Transaction } from "sequelize";
import { Uuid } from "../../../../core/base/Uuid";
import { FilterMap } from "../../application/mappers/FilterMap";
import { Filter } from "../../domain/models/Filter";

export interface IFilterRepo {
  save(filter: Filter, monitorpageAllocationUuid: Uuid, t: Transaction): Promise<void>;  
}

export class FilterRepo implements IFilterRepo {
  private models: any;

  constructor (
    models: any,
  ) {
    this.models = models;
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }
  
  public async save(filter: Filter, monitorpageAllocationUuid: Uuid, t: Transaction): Promise<void> {
    const FilterModel = this.models.Filter;
    const filterRaw = FilterMap.toPersistence(filter, monitorpageAllocationUuid);

    const query = this.createBaseQuery();
    query['where'].uuid = filter.uuid;
    const filterInstance = await FilterModel.findOne(query);

    if (filterInstance === null) {
      await FilterModel.create(filterRaw, { transaction: t });
    } else {
      await filterInstance.update(filterRaw, { transaction: t });
    }
  }  
}