import { logger } from '../logger';
import Queue from 'bull';
import { NikeMonitor } from '../monitors/NikeMonitor';

export default () => {
  const queue = new Queue('Monitor Queue', 'redis://redis:6379');
  queue.process('nike', NikeMonitor.Run);

  logger.info('Queue Initialized');

  return queue;
}