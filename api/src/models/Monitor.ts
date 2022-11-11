import { Sequelize, DataTypes, Model, Optional, Association, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Role } from './Role';
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
    userId: DataTypes.STRING,
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

  Monitor.hasMany(Monitorsource, {
    sourceKey: 'id',
    foreignKey: 'monitorId',
    as: 'monitorsources'
  });
}