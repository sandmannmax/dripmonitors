import { Sequelize, DataTypes, Model, Optional, Association, BelongsToGetAssociationMixin, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Cooldown } from './Cooldown';
import { Monitorpageconfig } from './Monitorpageconfig';
import { Product } from './Product';
import { Url } from './Url';

interface MonitorpageAttributes {  
  id: string;
  name: string;
  cc: string;
  techname: string;
  visible: boolean;
  running: boolean;
  currentRunningState: boolean;
  interval: number;
  monitorpageconfigId: string | null;
}

interface MonitorpageCreationAttributes extends Optional<MonitorpageAttributes, "id" | "visible" | "running" | "currentRunningState" | "interval" | "monitorpageconfigId"> {}

export class Monitorpage extends Model<MonitorpageAttributes, MonitorpageCreationAttributes> implements MonitorpageAttributes {  
  public id!: string;
  public name!: string;
  public cc!: string;
  public techname!: string;
  public visible!: boolean;
  public running!: boolean;
  public currentRunningState!: boolean;
  public interval!: number;
  public monitorpageconfigId!: string | null;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMonitorpageconfig!: BelongsToGetAssociationMixin<Monitorpageconfig>;
  public getProducts!: HasManyGetAssociationsMixin<Product>;
  public createProduct!: HasManyCreateAssociationMixin<Product>;
  public getUrls!: HasManyGetAssociationsMixin<Url>;
  public createUrl!: HasManyCreateAssociationMixin<Url>;
  public getCooldowns!: HasManyGetAssociationsMixin<Cooldown>;
  public createCooldown!: HasManyCreateAssociationMixin<Cooldown>;

  public readonly monitorpageconfig?: Monitorpageconfig;
  public readonly products?: Product[];
  public readonly urls?: Url[];
  public readonly cooldowns?: Cooldown[];

  public static associations: {
    monitorpageconfig: Association<Monitorpage, Monitorpageconfig>;
    products: Association<Monitorpage, Product>;
    urls: Association<Monitorpage, Url>;
    cooldowns: Association<Monitorpage, Cooldown>;
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
    techname: {
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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0
    },
    monitorpageconfigId: DataTypes.STRING
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() { 
  Monitorpage.belongsTo(Monitorpageconfig, {
    targetKey: 'id',
    foreignKey: 'monitorpageconfigId',
    as: 'monitorpageconfig'
  })

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

  Monitorpage.hasMany(Cooldown, {
    sourceKey: 'id',
    foreignKey: 'monitorpageId',
    as: 'cooldowns'
  });
}