import bull, { Queue } from 'bull';
import config from '../config';
import redis from 'redis';
import Container from 'typedi';
import { RunService } from '../services/RunService';

export class QueueProvider {
  private static queue: Queue;

  public static GetQueue() {
    if (!QueueProvider.queue) {
      QueueProvider.queue = new bull('Monitor Queue', `redis://${config.redisHost}:${config.redisPort}`);
      const runService = Container.get(RunService);

      QueueProvider.queue.process('monitor', job => {
        runService.Run({ id: job.data.id });
      });
    }
    
    return QueueProvider.queue;
  }
}