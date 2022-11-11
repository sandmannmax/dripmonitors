import { Uuid } from '../../../../core/base/Uuid';
import { MonitorsourceMap } from '../../application/mappers/MonitorsourceMap';
import { MonitorsourceNotFoundException } from '../../domain/exceptions/MonitorsourceNotFoundException';
import { Monitorsource } from '../../domain/models/Monitorsource';
import { IMonitorsourceRepo } from '../../domain/repos/IMonitorsourceRepo';
import { Sequelize } from 'sequelize';
import { IMonitorpageAllocationRepo } from './MonitorpageAllocationRepo';
import { logger } from '../../../../utils/logger';

export class MonitorsourceRepo implements IMonitorsourceRepo {
  private sequelize: Sequelize;
  private models: any;
  private monitorpageAllocationRepo: IMonitorpageAllocationRepo;

  constructor (
    sequelize: Sequelize,
    models: any,
    monitorpageAllocationRepo: IMonitorpageAllocationRepo,
  ) {
    this.sequelize = sequelize;
    this.models = models;
    this.monitorpageAllocationRepo = monitorpageAllocationRepo;
  }

  private createBaseQuery (): any {
    const { models } = this;
    return {
      where: {},
      include: [
        { 
          model: models.MonitorpageAllocation, as: 'MonitorpageAllocations',
          include: [
            { 
              model: models.Filter, as: 'Filters' 
            }
          ]
        }
      ]
    }
  }

  public async getMonitorsources(): Promise<Monitorsource[]> {
    const MonitorsourceModel = this.models.Monitorsource;
    const query = this.createBaseQuery();
    const sequelizeMonitorsourceInstances = await MonitorsourceModel.findAll(query);
    const monitorsources: Monitorsource[] = [];
    sequelizeMonitorsourceInstances.forEach((m: any) => {
      monitorsources.push(MonitorsourceMap.toAggregate(m))
    });
    return monitorsources;
  }

  public async getMonitorsourceByUuid(monitorsourceUuid: Uuid): Promise<Monitorsource> {
    const MonitorsourceModel = this.models.Monitorsource;
    const query = this.createBaseQuery();
    query['where'].monitorsource_uuid = monitorsourceUuid.toString();
    const sequelizeMonitorsourceInstance = await MonitorsourceModel.findOne(query);
    if (sequelizeMonitorsourceInstance === null) {
      throw new MonitorsourceNotFoundException();
    }
    return MonitorsourceMap.toAggregate(sequelizeMonitorsourceInstance);
  }

  public async exists(monitorsourceUuid: Uuid): Promise<boolean> {
    const Monitorsource = this.models.Monitorsource;
    const query = this.createBaseQuery();
    query['where'].monitorsource_uuid = monitorsourceUuid.toString();
    const monitorsource = await Monitorsource.findOne(query);
    return monitorsource !== null;
  }

  public async save(monitorsource: Monitorsource): Promise<void> {
    const MonitorsourceModel = this.models.Monitorsource;
    const monitorsourceRaw = MonitorsourceMap.toPersistence(monitorsource);

    const query = this.createBaseQuery();
    query['where'].monitorsource_uuid = monitorsource.uuid.toString();
    const monitorsourceInstance = await MonitorsourceModel.findOne(query);

    const t = await this.sequelize.transaction();

    try {
      await Promise.all(monitorsource.monitorpageAllocations.map(m => this.monitorpageAllocationRepo.save(m, monitorsource.uuid, t)));

      if (monitorsourceInstance === null) {
        await MonitorsourceModel.create(monitorsourceRaw, { transaction: t });
      } else {
        await monitorsourceInstance.update(monitorsourceRaw, { transaction: t });
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  public async delete(monitorsource: Monitorsource): Promise<void> {
    const MonitorsourceModel = this.models.Monitorsource;

    const query = this.createBaseQuery();
    query['where'].monitorsource_uuid = monitorsource.uuid.toString();
    const monitorsourceInstance = await MonitorsourceModel.findOne(query);

    if (monitorsourceInstance == null){
      throw new MonitorsourceNotFoundException();
    }

    await monitorsourceInstance.destroy();
  }
}