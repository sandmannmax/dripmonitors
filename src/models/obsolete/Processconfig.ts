import { Sequelize, DataTypes, Model, Association, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';
import { Pipeelement } from './Pipeelement';

interface ProcessconfigAttributes {
  id: string;
  monitorpageconfigId: string;
  hasConstant: boolean;
  constant: boolean;
}

interface ProcessconfigCreationAttributes extends Optional<ProcessconfigAttributes, "id"> {}

export class Processconfig extends Model<ProcessconfigAttributes, ProcessconfigCreationAttributes> implements ProcessconfigAttributes {
  public id!: string;
  public monitorpageconfigId!: string;
  public hasConstant!: boolean;
  public constant!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getPipeelements!: HasManyGetAssociationsMixin<Pipeelement>;
  public createPipeelement!: HasManyCreateAssociationMixin<Pipeelement>;

  public readonly pipeelements?: Pipeelement[];

  public static associations: {
    pipeelements: Association<Processconfig, Pipeelement>;
  };
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Processconfig.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    monitorpageconfigId: {
      type: DataTypes.UUID,
      allowNull: false
    },
    hasConstant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    constant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() {
  Processconfig.hasMany(Pipeelement, {
    sourceKey: 'id',
    foreignKey: 'processconfigId',
    as: 'pipeelements'
  })
}