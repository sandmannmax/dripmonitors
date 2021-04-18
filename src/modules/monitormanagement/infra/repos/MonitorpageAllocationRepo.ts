import { Transaction } from "sequelize";
import { Uuid } from "../../../../core/base/Uuid";
import { MonitorpageAllocationMap } from "../../application/mappers/MonitorpageAllocationMap";
import { MonitorpageAllocation } from "../../domain/models/MonitorpageAllocation";
import { IFilterRepo } from "./FilterRepo";

export interface IMonitorpageAllocationRepo {
  save(monitorpageAllocation: MonitorpageAllocation, monitorUuid: Uuid, t: Transaction): Promise<void>;  
}

export class MonitorpageAllocationRepo implements IMonitorpageAllocationRepo {
  private models: any;
  private filterRepo: IFilterRepo;

  constructor (
    models: any,
    filterRepo: IFilterRepo,
  ) {
    this.models = models;
    this.filterRepo = filterRepo;
  }

  private createBaseQuery (): any {
    const { models } = this;
    return {
      where: {},
      include: [{ model: models.Filter, as: 'Filters' }]
    }
  }
  
  public async save(monitorpageAllocation: MonitorpageAllocation, monitorUuid: Uuid, t: Transaction): Promise<void> {
    const MonitorpageAllocationModel = this.models.Monitorsource;
    const monitorpageAllocationRaw = MonitorpageAllocationMap.toPersistence(monitorpageAllocation, monitorUuid);

    const query = this.createBaseQuery();
    query['where'].uuid = monitorpageAllocation.uuid.toString();
    const monitorpageAllocationInstance = await MonitorpageAllocationModel.findOne(query);

    await Promise.all(monitorpageAllocation.filters.map(f => this.filterRepo.save(f, monitorpageAllocation.uuid, t)));

    if (monitorpageAllocationInstance === null) {
      await MonitorpageAllocationModel.create(monitorpageAllocationRaw, { transaction: t });
    } else {
      await monitorpageAllocationInstance.update(monitorpageAllocationRaw, { transaction: t });
    }
  }  
}