import redis from 'redis';
import config from '../config';
import { logger } from '../logger';
import { Run } from '../monitors/Run';

export default () => {
  const redisClient = redis.createClient({
    host: config.redisHost,
    port: Number.parseInt(config.redisPort)
  });

  redisClient.on('ready', () => redisClient.subscribe('monitor'));
  redisClient.on('error', error => logger.error(error));

  redisClient.on('message', (channel, message) => {
    logger.debug('Received message: ' + message)
    Run(JSON.parse(message));
  });
}