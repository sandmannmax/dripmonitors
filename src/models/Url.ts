import { Sequelize, DataTypes, Model, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';

interface UrlAttributes {
  id: string;
  monitorpageId: string;
  url: string;
}

interface UrlCreationAttributes extends Optional<UrlAttributes, "id"> {}

export class Url extends Model<UrlAttributes, UrlCreationAttributes> implements UrlAttributes {
  public id!: string;
  public monitorpageId!: string;
  public url!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Url.init({
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
    url: {
      type: new DataTypes.STRING(1000),
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}