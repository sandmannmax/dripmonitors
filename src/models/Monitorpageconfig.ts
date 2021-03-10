import { Sequelize, DataTypes, Model, Optional, Association, HasOneGetAssociationMixin, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, UUIDV4 } from 'sequelize';
import { Container } from 'typedi';
import { Monitorpage } from './Monitorpage';
import { Processconfig } from './Processconfig';

interface MonitorpageconfigAttributes {
  id: string;
  isHtml: boolean;
  allSizesAvailable: boolean;
  soldOutCheckSizes: boolean;
  hasParentProducts: boolean;
  hasChildProducts: boolean;
}

interface MonitorpageconfigCreationAttributes extends Optional<MonitorpageconfigAttributes, "id" | "isHtml" | "allSizesAvailable" | "soldOutCheckSizes" | "hasParentProducts" | "hasChildProducts"> {}

export class Monitorpageconfig extends Model<MonitorpageconfigAttributes, MonitorpageconfigCreationAttributes> implements MonitorpageconfigAttributes {
  public id!: string;
  public isHtml!: boolean;
  public allSizesAvailable!: boolean;
  public soldOutCheckSizes!: boolean;
  public hasParentProducts!: boolean;
  public hasChildProducts!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getProcessconfigs!: HasManyGetAssociationsMixin<Processconfig>;
  public createProcessconfig!: HasManyCreateAssociationMixin<Processconfig>;

  public readonly processconfigs?: Processconfig[];

  public static associations: {
    processconfigs: Association<Monitorpageconfig, Processconfig>;
  };
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Monitorpageconfig.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    isHtml: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    allSizesAvailable: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    soldOutCheckSizes: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    hasParentProducts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    hasChildProducts: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() {
  Monitorpageconfig.hasMany(Processconfig, {
    sourceKey: 'id',
    foreignKey: 'monitorpageconfigId',
    as: 'processconfigs'
  });
}