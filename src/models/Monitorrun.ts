import { Sequelize, DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Monitorpage } from './Monitorpage';
import { Proxy } from './Proxy';

interface MonitorrunAttributes {  
  id: string;
  monitorpageId: string;
  proxyId: string;
  timestampStart: number;
  timestampEnd: number;
  success: boolean;
  reason: string;
}

interface MonitorrunCreationAttributes extends Optional<MonitorrunAttributes, "id" | "proxyId"| "timestampEnd"  | "success" | "reason"> {}

export class Monitorrun extends Model<MonitorrunAttributes, MonitorrunCreationAttributes> implements MonitorrunAttributes {  
  public id!: string;
  public monitorpageId!: string;
  public proxyId!: string;
  public timestampStart!: number;
  public timestampEnd!: number;
  public success!: boolean;
  public reason!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Monitorrun.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    monitorpageId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    proxyId: DataTypes.UUID,
    timestampStart: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    timestampEnd: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    success:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    reason:  {
      type: DataTypes.STRING
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() { 
  Monitorrun.belongsTo(Monitorpage, {
    targetKey: 'id',
    foreignKey: 'monitorpageId'
  })

  Monitorrun.belongsTo(Proxy, {
    targetKey: 'id',
    foreignKey: 'proxyId'
  })
}