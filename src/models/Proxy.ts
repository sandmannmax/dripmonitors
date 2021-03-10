import { Sequelize, DataTypes, Model, Association, HasManyGetAssociationsMixin, HasManyCreateAssociationMixin, UUIDV4, Optional } from 'sequelize';
import { Container } from 'typedi';
import { Cooldown } from './Cooldown';

interface ProxyAttributes {
  id: string;
  address: string;
  cc: string;
}

interface ProxyCreationAttributes extends Optional<ProxyAttributes, "id"> {}

export class Proxy extends Model<ProxyAttributes, ProxyCreationAttributes> implements ProxyAttributes {
  public id!: string;
  public address!: string;
  public cc!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getCooldowns!: HasManyGetAssociationsMixin<Cooldown>;
  public createCooldown!: HasManyCreateAssociationMixin<Cooldown>;

  public readonly cooldowns?: Cooldown[];

  public static associations: {
    cooldowns: Association<Proxy, Cooldown>;
  };
}

export function Setup() {
  let dbConnection = Container.get<Sequelize>("dbConnection");

  Proxy.init({
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: UUIDV4
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cc: {
      type: new DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    sequelize: dbConnection
  });
}

export function SetupAssociations() {
  Proxy.hasMany(Cooldown, {
    sourceKey: 'id',
    foreignKey: 'proxyId',
    as: 'cooldowns'
  });
}