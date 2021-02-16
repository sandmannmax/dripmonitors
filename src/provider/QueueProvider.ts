import bull, { Queue } from 'bull';
import config from '../config';
import redis from 'redis';

export class QueueProvider {
  private static queue: Queue;

  public static GetQueue() {
    if (!QueueProvider.queue) {
      QueueProvider.queue = new bull('Monitor Queue', `redis://${config.redisHost}:${config.redisPort}`);
      const redisClient = redis.createClient({
        host: config.redisHost,
        port: Number.parseInt(config.redisPort)
      });

      QueueProvider.queue.process('monitor', job => {
        redisClient.publish('monitor', JSON.stringify({ id: job.data.id, techname: job.data.techname, name: job.data.name }));
      });
    }
    
    return QueueProvider.queue;
  }
}