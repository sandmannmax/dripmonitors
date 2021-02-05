import { Inject } from 'typedi';
import { logger } from '../logger';
import { DatabaseProvider } from '../provider/DatabaseProvider';

export default () => {
  const dbProvider = new DatabaseProvider();
  Inject(DatabaseProvider => () => dbProvider);
}

logger.info('DatabaseProvider initialized')