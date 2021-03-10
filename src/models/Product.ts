import { Sequelize, DataTypes, Model, Association, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, Optional, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Size } from './Size';

interface ProductAttributes {
  id: string;
  name: string;
  monitorpageId: string;
  href: string | null;
  img: string | null;
  price: string | null;
  soldOut: boolean;
  active: boolean;
  hasSizes: boolean;
}

interface ProductCreationAttributes extends Optional<ProductAttributes, "href"| "img" | "price"> {}

export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
  public id!: string;
  public name!: string;
  public monitorpageId!: string;
  public href!: string | null;
  public img!: string | null;
  public price!: string | null;
  public soldOut!: boolean;
  public active!: boolean;
  public hasSizes!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getSizes!: HasManyGetAssociationsMixin<Size>;
  public createSize!: HasManyCreateAssociationMixin<Size>;

  public readonly sizes?: Size[];

  public static associations: {
    sizes: Association<Product, Size>;
  };
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Product.init({
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monitorpageId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    href: new DataTypes.STRING(500),
    img: DataTypes.STRING,
    price: DataTypes.STRING,
    soldOut: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    hasSizes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() {
  Product.hasMany(Size, {
    sourceKey: 'id',
    foreignKey: 'productId',
    as: 'sizes'
  });
}