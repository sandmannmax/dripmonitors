'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Monitorpages', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      functionName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      cc:  {
        type: new Sequelize.STRING(10),
        allowNull: false
      },
      visible:  {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      running: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      currentRunningState: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      interval: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      isHtml: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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
    await queryInterface.dropTable('Monitorpages');
  }
};