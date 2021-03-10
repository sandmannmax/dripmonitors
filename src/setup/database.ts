import config from '../config';
import { Sequelize } from 'sequelize'; 
import { logger } from '../logger';
import Container from 'typedi';
import { Setup, Monitor } from '../models/Monitor';

export async function DatabaseSetup() {
  let connection = new Sequelize(`postgres://${config.postgresUser}:${config.postgresPassword}@${config.postgresHost}:${config.postgresPort}/${config.postgresDb}`);
  await connection.authenticate();
  logger.info('Database connection established.');
  Container.set('dbConnection', connection);

  Setup();
}