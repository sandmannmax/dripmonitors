import { Sequelize, DataTypes, Model, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';

interface PipeelementAttributes {
  id: string;
  processconfigId: string;
  command: string;
  order: number;
}

interface PipeelementCreationAttributes extends Optional<PipeelementAttributes, "id"> {}

export class Pipeelement extends Model<PipeelementAttributes, PipeelementCreationAttributes> implements PipeelementAttributes {
  public id!: string;
  public processconfigId!: string;
  public command!: string;
  public order!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Pipeelement.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    processconfigId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    command: {
      type: DataTypes.STRING,
      allowNull: false
    },
    order: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}