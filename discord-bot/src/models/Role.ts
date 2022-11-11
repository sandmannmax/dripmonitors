import { Sequelize, DataTypes, Model, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';

interface RoleAttributes {
  id: string,
  name: string,
  roleId: string,
  monitorId: string
}

interface RoleCreationAttributes extends Optional<RoleAttributes, "id"> {}

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public id!: string;
  public name!: string;
  public roleId!: string;
  public monitorId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Role.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    roleId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monitorId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}