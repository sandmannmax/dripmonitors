'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Cooldowns', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      proxyId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      monitorpageId: {
        type: Sequelize.UUID,
        allowNull: false
      },
      remaining: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      counter: {
        type: Sequelize.INTEGER,
        allowNull: false
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
    await queryInterface.dropTable('Cooldowns');
  }
};