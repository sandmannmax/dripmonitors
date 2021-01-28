import { Application } from 'express';
import queueLoader from './queue';
import expressLoader from './express';
import databaseLoader from './database';
import redisLoader from './redis';
import { logger } from '../logger';

export default async (expressApp: Application) => {
  logger.info('Application Setup Started...')
  
  const queue = queueLoader();
  await expressLoader(expressApp, queue);
  databaseLoader();
  redisLoader();

  logger.info('Application Setup Finished.')
}