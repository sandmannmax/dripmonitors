'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitor', {
      monitor_uuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      server_uuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'server',
          },
          key: 'server_uuid'
        },
        onDelete: 'CASCADE'
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      image: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      running: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      webhook_id: {
        type: new Sequelize.DataTypes.STRING(18),
        allowNull: false
      },
      webhook_token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      is_invalid: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false
      },
      monitorsource_uuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: {
            tableName: 'monitorsource', 
          },
          key: 'monitorsource_uuid'
        }
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
    await queryInterface.dropTable('monitor');
  }
};