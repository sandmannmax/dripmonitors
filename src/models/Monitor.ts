import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Sequelize, DataTypes, Model, Optional, Association, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyCreateAssociationMixin, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Role } from './Role';
import { Monitorrun } from './Monitorrun';
import { Monitorsource } from './Monitorsource';

interface MonitorAttributes {
  id: string;
  botImage: string | null;
  botName: string | null;
  webHook: string | null;
  userId: string;
  running: boolean;
}

interface MonitorCreationAttributes extends Optional<MonitorAttributes, "id" | "botImage" | "botName" | "webHook" | "running"> {}

export class Monitor extends Model<MonitorAttributes, MonitorCreationAttributes> implements MonitorAttributes {
  public id!: string;
  public botImage!: string | null;
  public botName!: string | null;
  public webHook!: string | null;
  public userId!: string;
  public running!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRoles!: HasManyGetAssociationsMixin<Role>;
  public createRole!: HasManyCreateAssociationMixin<Role>;
  public getMonitorsources!: HasManyGetAssociationsMixin<Monitorsource>;
  public createMonitorsource!: HasManyCreateAssociationMixin<Monitorsource>; 

  public readonly roles?: Role[];
  public readonly monitorsources?: Monitorsource[];

  public static associations: {
    roles: Association<Monitor, Role>;
    monitorsources: Association<Monitor, Monitorsource>;
  };


  // async Setup() {
  //   this.dbConnection = Container.get('dbConnection');

  //   MonitorModel.init({
  //     id: {
  //       type: DataTypes.STRING,
  //       allowNull: false,
  //       primaryKey: true
  //     },
  //     botImage: DataTypes.STRING,
  //     botName: DataTypes.STRING,
  //     webHook: DataTypes.STRING,
  //     userId: DataTypes.STRING
  //   }, {
  //     sequelize: this.dbConnection,
  //     modelName: 'Monitor'
  //   });
  // }



  // async GetMonitor({ id }: { id: string }): Promise<Monitor> {
  //   let o = MonitorModel.build({  })
  //   let result = await this.dbProvider.Get('lsb.monitors', { id });
  //   return result.Item as Monitor;
  // }

  // async GetMonitorsNotify({ product, monitorpageId }: { product: Product, monitorpageId: string }): Promise<Array<Monitor>> {
  //   let monitors: Array<Monitor> = [];
  //   let monitorsources: Array<Monitorsource> = [];

  //   let result = await this.dbProvider.Scan('lsb.monitorsources', "#a = :all", { ":all": true }, { '#a': 'all' });
  //   if (result.Items != null) {
  //     for (let i = 0; i < result.Items.length; i++) {
  //       let monitorsource = result.Items[i] as Monitorsource;
  //       if (monitorsource)
  //         monitorsources.push(monitorsource);
  //     }
  //   }

  //   if (monitorpageId) {
  //     result = await this.dbProvider.Scan('lsb.monitorsources', "monitorpageId = :monitorpageId", { ":monitorpageId": monitorpageId });
  //     if (result.Items != null) {
  //       for (let i = 0; i < result.Items.length; i++) {
  //         let monitorsource = result.Items[i] as Monitorsource;
  //         if (monitorsource)
  //           monitorsources.push(monitorsource);
  //       }
  //     }
  //   }

  //   if (product) {
  //     result = await this.dbProvider.Scan('lsb.monitorsources', "productId = :productId", { ":productId": product.id });
  //     if (result.Items != null) {
  //       for (let i = 0; i < result.Items.length; i++) {
  //         let monitorsource = result.Items[i] as Monitorsource;
  //         if (monitorsource)
  //           monitorsources.push(monitorsource);
  //       }
  //     }
  //   }

  //   for (let i = 0; i < monitorsources.length; i++) { 
  //     let index = monitors.findIndex(monitor => monitor.id == monitorsources[i].id);
  //     if (index === -1) {
  //       let result = await this.dbProvider.Get('lsb.monitors', { id: monitorsources[i].monitorId });
  //       let monitor = result.Item as Monitor;
  //       if (monitor && monitor.running)
  //         monitors.push(result.Item as Monitor);
  //     }
  //   }

  //   return monitors;
  // }

  // async GetMonitors({ userId }: {userId: string}): Promise<Array<Monitor>> {
  //   let result = await this.dbProvider.Find('lsb.monitors', "userId = :userId", { ":userId": userId }, "userId-index");
  //   return result.Items as Array<Monitor>;
  // }

  // CreateMonitor = async function ({ id, userId }: { id: string, userId: string }): Promise<Monitor> {
  //   await this.dbProvider.Insert('lsb.monitors', { id, userId, webHook: '', botName: '', botImage: '', running: false });
  //   let result = await this.dbProvider.Get('lsb.monitors', { id });
  //   return result.Item as Monitor;
  // }

  // DeleteMonitor = async function ({ id }: { id: string }) {
  //   await this.dbProvider.Delete('lsb.monitors', { id });
  // }

  // UpdateBotImage = async function ({ id, botImage}: { id: string, botImage: string }) {
  //   await this.dbProvider.Update('lsb.monitors', { id }, "set botImage = :botImage", { ":botImage": botImage });
  // }

  // UpdateBotName = async function ({ id, botName}: { id: string, botName: string }) {
  //   await this.dbProvider.Update('lsb.monitors', { id }, "set botName = :botName", { ":botName": botName });
  // }

  // UpdateWebhook = async function ({ id, webHook}: { id: string, webHook: string }) {
  //   await this.dbProvider.Update('lsb.monitors', { id }, "set webHook = :webHook", { ":webHook": webHook });
  // }

  // UpdateRunning = async function ({ id, running}: { id: string, running: boolean }) {
  //   await this.dbProvider.Update('lsb.monitors', { id }, "set running = :running", { ":running": running });
  // }

  // UpdateRole = async function ({ id, role }: { id: string, role: string }) {
  //   await this.dbProvider.Update('lsb.monitors', { id }, "set #r = :role", { ":role": role }, null, { '#r': 'role' });
  // }

  // GetRoleMonitorCount = async function (role: string) {
  //   return (await this.dbProvider.Get('lsb.monitor_rolecount', { role })).Item; // TODO so nicht richtig
  // }

  // IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
  //   let result = await this.dbProvider.Get('lsb.monitors', { id });
  //   return result.Item == null;
  // }
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Monitor.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    botImage: new DataTypes.STRING(500),
    botName: DataTypes.STRING,
    webHook: new DataTypes.STRING(500),
    userId: DataTypes.UUID,
    running: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() {
  Monitor.hasMany(Role, {
    sourceKey: 'id',
    foreignKey: 'monitorId',
    as: 'roles'
  });

  Monitor.hasMany(Monitorrun, {
    sourceKey: 'id',
    foreignKey: 'monitorId',
    as: 'monitorsources'
  });
}