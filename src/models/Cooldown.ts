import { Sequelize, DataTypes, Model, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';

interface CooldownAttributes {
  id: string;
  proxyId: string;
  monitorpageId: string;
  remaining: number;
  counter: number;
}

interface CooldownCreationAttributes extends Optional<CooldownAttributes, "id"> {}

export class Cooldown extends Model<CooldownAttributes, CooldownCreationAttributes> implements CooldownAttributes {
  public id!: string;
  public proxyId!: string;
  public monitorpageId!: string;
  public remaining!: number;
  public counter!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Cooldown.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    proxyId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    monitorpageId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    remaining: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    counter: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}