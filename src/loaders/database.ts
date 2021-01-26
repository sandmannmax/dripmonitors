import { Inject } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import config from '../config';
import { logger } from '../logger';

export default () => {
  const dbProvider = new DatabaseProvider(config.dbConnection, config.dbUser, config.dbPassword);
  Inject(DatabaseProvider => () => dbProvider);

  logger.info('DatabaseProvider Initialized');
}