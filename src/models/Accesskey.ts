import { Sequelize, DataTypes, Model, Optional, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';

interface AccesskeyAttributes {
  id: string;
  used: boolean;
  isBetakey: boolean;
  userId: string | null;  
}

interface AccesskeyCreationAttributes extends Optional<AccesskeyAttributes, "id" | "used" | "isBetakey" | "userId"> {}

export class Accesskey extends Model<AccesskeyAttributes, AccesskeyCreationAttributes> implements AccesskeyAttributes {
  public id!: string;
  public used!: boolean;
  public isBetakey!: boolean;
  public userId!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Accesskey.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    used: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isBetakey: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    userId: DataTypes.STRING
  }, {
    sequelize: dbConnection
  });
}