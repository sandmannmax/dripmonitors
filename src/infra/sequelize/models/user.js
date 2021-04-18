module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('user', {
    user_uuid: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    user_discord_id: {
      type: DataTypes.STRING(18),
      allowNull: false
    }
  },{
    timestamps: true,
    underscored: true, 
    tableName: 'user'
  });

  User.associate = (models) => {
    User.hasMany(models.Server, { as: 'Servers', foreignKey: 'user_uuid', sourceKey: 'user_uuid', onDelete: 'CASCADE' });
  }

  return User;
};