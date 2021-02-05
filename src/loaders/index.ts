import { Application } from 'express';
import expressLoader from './express';
import databaseLoader from './database';
import { logger } from '../logger';

export default async (expressApp: Application) => {
  logger.info('Application Setup Started...')

  await expressLoader(expressApp);
  databaseLoader();

  logger.info('Application Setup Finished.')
}