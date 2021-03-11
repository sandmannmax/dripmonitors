'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Monitorpageconfigs', {
      id: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      isHtml: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      allSizesAvailable: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      soldOutCheckSizes: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      hasParentProducts: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      hasChildProducts: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Monitorpageconfigs');
  }
};