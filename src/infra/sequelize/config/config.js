const Sequelize = require('sequelize');
const config = require('../../../utils/setup').default;

module.exports.connection = new Sequelize(config.postgresDb, config.postgresUser, config.postgresPassword, {
  host: config.postgresHost,
  dialect: 'postgresql',
  port: config.postgresPort,
  logging: false,
});