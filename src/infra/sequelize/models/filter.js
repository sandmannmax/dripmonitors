module.exports = function(sequelize, DataTypes) {
  const Filter = sequelize.define('filter', {
    filter_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    monitorpage_allocation_uuid: {
      type: DataTypes.UUID,
      allowNull: false
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'filter'
  });

  Filter.associate = (models) => {
    Filter.belongsTo(models.MonitorpageAllocation, { as: 'MonitorpageAllocation', foreignKey: 'monitorpage_allocation_uuid', sourceKey: 'monitorpage_allocation_uuid', onDelete: 'CASCADE' });
  }

  return Filter;
};