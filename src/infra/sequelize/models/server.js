module.exports = function(sequelize, DataTypes) {
  const Server = sequelize.define('server', {
    server_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_uuid'
      },
      onDelete: 'CASCADE'
    },
    server_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    server_discord_id: {
      type: DataTypes.STRING(18),
      allowNull: false
    },
    is_monitor_subscription_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'server'
  });

  Server.associate = (models) => {
    Server.belongsTo(models.User, { as: 'User', foreignKey: 'user_uuid', sourceKey: 'user_uuid', onDelete: 'CASCADE' });
    Server.hasMany(models.Monitor, { as: 'Monitors', foreignKey: 'server_uuid', sourceKey: 'server_uuid', onDelete: 'CASCADE' });
  }

  return Server;
};