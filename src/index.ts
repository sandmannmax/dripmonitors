import redisLoader from './loaders/redis';
import { logger } from './logger';

redisLoader();
logger.info('Monitor started...')