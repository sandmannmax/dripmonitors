import { Sequelize, DataTypes, Model, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';

interface ProxyAttributes {
  id: string;
  address: string;
  cc: string;
}

interface ProxyCreationAttributes extends Optional<ProxyAttributes, "id"> {}

export class Proxy extends Model<ProxyAttributes, ProxyCreationAttributes> implements ProxyAttributes {
  public id!: string;
  public address!: string;
  public cc!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Proxy.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cc: {
      type: new DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize: dbConnection,
    tableName: 'Proxies'
  });
}