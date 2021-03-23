import { Sequelize, DataTypes, Model, Optional, Association, BelongsToGetAssociationMixin, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Product } from './Product';
import { Url } from './Url';

interface MonitorpageAttributes {  
  id: string;
  name: string;
  cc: string;
  functionName: string;
  visible: boolean;
  running: boolean;
  currentRunningState: boolean;
  interval: number;
  isHtml: boolean;
}

interface MonitorpageCreationAttributes extends Optional<MonitorpageAttributes, "id" | "visible" | "running" | "currentRunningState" | "interval" | "isHtml" | "functionName"> {}

export class Monitorpage extends Model<MonitorpageAttributes, MonitorpageCreationAttributes> implements MonitorpageAttributes {  
  public id!: string;
  public name!: string;
  public cc!: string;
  public functionName!: string;
  public visible!: boolean;
  public running!: boolean;
  public currentRunningState!: boolean;
  public interval!: number;
  public isHtml!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public createProduct!: HasManyCreateAssociationMixin<Product>;
  public getUrls!: HasManyGetAssociationsMixin<Url>;
  public createUrl!: HasManyCreateAssociationMixin<Url>;

  public readonly products?: Product[];
  public readonly urls?: Url[];

  public static associations: {
    products: Association<Monitorpage, Product>;
    urls: Association<Monitorpage, Url>;
  };
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Monitorpage.init({
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
    functionName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cc:  {
      type: new DataTypes.STRING(10),
      allowNull: false
    },
    visible:  {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    running: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    currentRunningState: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    interval: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    isHtml: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() {
  Monitorpage.hasMany(Product, {
    sourceKey: 'id',
    foreignKey: 'monitorpageId',
    as: 'products'
  });

  Monitorpage.hasMany(Url, {
    sourceKey: 'id',
    foreignKey: 'monitorpageId',
    as: 'urls'
  });
}