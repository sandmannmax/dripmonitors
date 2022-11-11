import { Sequelize, DataTypes, Model, Optional, Association, BelongsToGetAssociationMixin, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Monitor } from './Monitor';
import { Monitorpage } from './Monitorpage';
import { Product } from './Product';

interface MonitorsourceAttributes {  
  id: string;
  monitorId: string;
  productId: string | null;
  monitorpageId: string | null;
  all: boolean;
}

interface MonitorsourceCreationAttributes extends Optional<MonitorsourceAttributes, "id" | "productId"| "monitorpageId"> {}

export class Monitorsource extends Model<MonitorsourceAttributes, MonitorsourceCreationAttributes> implements MonitorsourceAttributes {  
  public id!: string;
  public monitorId!: string;
  public productId!: string | null;
  public monitorpageId!: string | null;
  public all!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getMonitor!: BelongsToGetAssociationMixin<Monitor>;
  public getProduct!: BelongsToGetAssociationMixin<Product>;
  public getMonitorpage!: BelongsToGetAssociationMixin<Monitorpage>;

  public readonly monitor?: Monitor;
  public readonly product?: Product;
  public readonly monitorpage?: Monitorpage;

  public static associations: {
    monitor: Association<Monitorsource, Monitor>;
    product: Association<Monitorsource, Product>;
    monitorpage: Association<Monitorsource, Monitorpage>;
  };
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Monitorsource.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    monitorId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    productId: DataTypes.STRING,
    monitorpageId: DataTypes.UUID,
    all:  {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() { 
  Monitorsource.belongsTo(Monitor, {
    targetKey: 'id',
    foreignKey: 'monitorId',
    as: 'monitor'
  });

  Monitorsource.belongsTo(Product, {
    targetKey: 'id',
    foreignKey: 'productId',
    as: 'product'
  });

  Monitorsource.belongsTo(Monitorpage, {
    targetKey: 'id',
    foreignKey: 'monitorpageId',
    as: 'monitorpage'
  });
}