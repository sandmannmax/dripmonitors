import { Sequelize, DataTypes, Model } from 'sequelize';
import { Container } from 'typedi';

interface SizeAttributes {
  value: string;
  soldOut: boolean;
  productId: string;
}

interface SizeCreationAttributes {}

export class Size extends Model<SizeAttributes, SizeCreationAttributes> implements SizeAttributes {
  public value!: string;
  public soldOut!: boolean;
  public productId!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Size.init({
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    soldOut: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    productId: {
      type: DataTypes.UUID,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}