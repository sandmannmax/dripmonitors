import { Inject } from 'typedi';
import { logger } from '../logger';
import { RedisService } from '../services/RedisService';

export default () => {
  const redisService = new RedisService();
  Inject(RedisService => () => redisService);

  logger.info('RedisService Initialized');
}