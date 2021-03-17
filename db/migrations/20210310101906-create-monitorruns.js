'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Monitorruns', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      monitorpageId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      proxyId: Sequelize.UUID,
      timestampStart: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      timestampEnd: {
        type: Sequelize.BIGINT,
        allowNull: false
      },
      success:  {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      reason:  {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Monitorruns');
  }
};