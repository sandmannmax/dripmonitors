import redisLoader from './loaders/redis';
import { logger } from './logger';

logger.info('Starting setup...')
redisLoader();
logger.info('Monitor started...')