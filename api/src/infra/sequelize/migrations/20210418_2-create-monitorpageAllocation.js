'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('monitorpage_allocation', {
      monitorpage_allocation_uuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      monitorpage_uuid: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
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
      is_filtering: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('monitorpage_allocation');
  }
};