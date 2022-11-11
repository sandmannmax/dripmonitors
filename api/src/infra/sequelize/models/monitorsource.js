module.exports = function(sequelize, DataTypes) {
  const Monitorsource = sequelize.define('monitorsource', {
    monitorsource_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_visible: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    is_sending_notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'monitorsource'
  });

  Monitorsource.associate = (models) => {
    Monitorsource.hasMany(models.MonitorpageAllocation, { as: 'MonitorpageAllocations', foreignKey: 'monitorsource_uuid', sourceKey: 'monitorsource_uuid', onDelete: 'CASCADE' });
    Monitorsource.hasMany(models.Monitor, { as: 'Monitors', foreignKey: 'monitorsource_uuid', sourceKey: 'monitorsource_uuid' });
  }

  return Monitorsource;
};