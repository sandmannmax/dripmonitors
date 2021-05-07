import { Sequelize } from "sequelize";
import { Uuid } from "../../../../core/base/Uuid";
import { logger } from "../../../../utils/logger";
import { MonitorsourceUuid } from "../../../monitormanagement/domain/models/MonitorsourceUuid";
import { MonitorMap } from "../../application/mappers/MonitorMap";
import { Monitor } from "../../domain/models/Monitor";
import { IMonitorRepo } from "../../domain/repos/IMonitorRepo";
import { IRoleRepo } from "./RoleRepo";

export class MonitorRepo implements IMonitorRepo {
  private sequelize: Sequelize;
  private models: any;
  private roleRepo: IRoleRepo;

  constructor (
    sequelize: Sequelize,
    models: any,
    roleRepo: IRoleRepo,
  ) {
    this.sequelize = sequelize;
    this.models = models;
    this.roleRepo = roleRepo;
  }

  private createBaseQuery (): any {
    const { models } = this;
    return {
      where: {},
      include: [
        { 
          model: models.Role, as: 'Roles'
        },
        {
          model: models.Server, as: 'Server'
        }
      ]
    }
  }

  public async getMonitors(userUuid: Uuid, serverUuid: Uuid): Promise<Monitor[]> {
    const MonitorModel = this.models.Monitor;
    const query = this.createBaseQuery();
    query.where.server_uuid = serverUuid.toString();
    query.include = [{
      model: this.models.Server,
      as: 'Server',
      where: { user_uuid: userUuid.toString() }
    }];
    const sequelizeMonitorInstances = await MonitorModel.findAll(query);
    const monitors: Monitor[] = [];
    sequelizeMonitorInstances.forEach((m: any) => {
      monitors.push(MonitorMap.toAggregate(m))
    });
    return monitors;
  }

  public async getMonitorsByMonitorsourceUuid(monitorsourceUuid: MonitorsourceUuid): Promise<Monitor[]> {
    const MonitorModel = this.models.Monitorsource;
    const query = this.createBaseQuery();
    query.where.monitorsource_uuid = monitorsourceUuid.uuid.toString();
    const sequelizeMonitorInstances = await MonitorModel.findAll(query);
    const monitors: Monitor[] = [];
    sequelizeMonitorInstances.forEach((m: any) => {
      monitors.push(MonitorMap.toAggregate(m))
    });
    return monitors;
  }

  public async getMonitorByUuid(userUuid: Uuid, serverUuid: Uuid, monitorUuid: Uuid): Promise<Monitor> {
    const MonitorModel = this.models.Monitorsource;
    const query = this.createBaseQuery();
    query.where.Server.user_uuid = userUuid.toString();
    query.where.server_uuid = serverUuid.toString();
    query.where.monitor_uuid = monitorUuid.toString();
    const sequelizeMonitorInstance = await MonitorModel.findOne(query);
    return MonitorMap.toAggregate(sequelizeMonitorInstance);
  }

  public async exists(monitorUuid: Uuid): Promise<boolean> {
    const MonitorModel = this.models.Monitorsource;
    const query = this.createBaseQuery();
    query.where.monitor_uuid = monitorUuid.toString();
    const sequelizeMonitorInstance = await MonitorModel.findOne(query);
    return sequelizeMonitorInstance !== null;
  }

  public async save(monitor: Monitor): Promise<void> {
    const MonitorModel = this.models.Monitor;
    const monitorRaw = MonitorMap.toPersistence(monitor);

    const query = this.createBaseQuery();
    query.where.monitor_uuid = monitor.uuid.toString();
    const monitorInstance = await MonitorModel.findOne(query);

    const t = await this.sequelize.transaction();

    try {
      await Promise.all(monitor.roles.map(r => this.roleRepo.save(r, monitor.uuid, t)));

      if (monitorInstance === null) {
        await MonitorModel.create(monitorRaw, { transaction: t });
      } else {
        await monitorInstance.update(monitorRaw, { transaction: t });
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}