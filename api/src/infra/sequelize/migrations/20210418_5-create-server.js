'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('server', {
      server_uuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      user_uuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'user',
          },
          key: 'user_uuid'
        },
        onDelete: 'CASCADE'
      },
      server_name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      server_discord_id: {
        type: new Sequelize.DataTypes.STRING(18),
        allowNull: false
      },
      is_monitor_subscription_active: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('server');
  }
};