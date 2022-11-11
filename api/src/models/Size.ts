import { Sequelize, DataTypes, Model, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';

interface SizeAttributes {
  id: string;
  value: string;
  soldOut: boolean;
  productId: string;
}

interface SizeCreationAttributes extends Optional<SizeAttributes, "id"> {}

export class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
  public id!: string;
  public value!: string;
  public soldOut!: boolean;
  public productId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Size.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    soldOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    productId: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}