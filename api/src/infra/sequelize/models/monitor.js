module.exports = function(sequelize, DataTypes) {
  const Monitor = sequelize.define('monitor', {
    monitor_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    server_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'server',
        key: 'server_uuid'
      },
      onDelete: 'CASCADE'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    running: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    webhook_id: {
      type: new DataTypes.STRING(18),
      allowNull: false
    },
    webhook_token: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_invalid: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    monitorsource_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'monitorsource',
        key: 'monitorsource_uuid'
      }
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'monitor'
  });

  Monitor.associate = (models) => {
    Monitor.belongsTo(models.Server, { as: 'Server', foreignKey: 'server_uuid', sourceKey: 'server_uuid', onDelete: 'CASCADE' });
    Monitor.belongsTo(models.Monitorsource, { as: 'Monitorsource', foreignKey: 'monitorsource_uuid', sourceKey: 'monitorsource_uuid' });
    Monitor.hasMany(models.Role, { as: 'Roles', foreignKey: 'monitor_uuid', sourceKey: 'monitor_uuid', onDelete: 'CASCADE' });
  }

  return Monitor;
};