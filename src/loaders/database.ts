import { Inject } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { logger } from '../logger';

export default () => {
  const dbProvider = new DatabaseProvider();
  Inject(DatabaseProvider => () => dbProvider);

  logger.info('DatabaseProvider Initialized');
}