module.exports = function(sequelize, DataTypes) {
  const MonitorpageAllocation = sequelize.define('monitorpage_allocation', {
    monitorpage_allocation_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    monitorpage_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    is_filtering: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'monitorpage_allocation'
  });

  MonitorpageAllocation.associate = (models) => {
    MonitorpageAllocation.belongsTo(models.Monitorsource, { as: 'Monitorsource', foreignKey: 'monitorsource_uuid', sourceKey: 'monitorsource_uuid', onDelete: 'CASCADE' });
    MonitorpageAllocation.hasMany(models.Filter, { as: 'Filters', foreignKey: 'monitorpage_allocation_uuid', sourceKey: 'monitorpage_allocation_uuid', onDelete: 'CASCADE' });
  }

  return MonitorpageAllocation;
};