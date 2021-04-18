module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define('role', {
    role_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    discord_id: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    monitor_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'monitor',
        key: 'monitor_uuid'
      },
      onDelete: 'CASCADE'
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'role'
  });

  Role.associate = (models) => {
    Role.belongsTo(models.Monitor, { as: 'Monitor', foreignKey: 'monitor_uuid', sourceKey: 'monitor_uuid', onDelete: 'CASCADE' });
  }

  return Role;
};