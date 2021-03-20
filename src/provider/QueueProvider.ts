import bull, { Queue } from 'bull';
import config from '../config';
import redis from 'redis';
import Container from 'typedi';
import { RunService } from '../services/RunService';
import { Monitorpage } from '../models/Monitorpage';

export class QueueProvider {
  private static queue: Queue;

  public static GetQueue() {
    if (!QueueProvider.queue) {
      QueueProvider.queue = new bull('Monitor Queue', `redis://${config.redisHost}:${config.redisPort}`);    
      QueueProvider.SetupQueue();
    }
    
    return QueueProvider.queue;
  }

  public static async SetupQueue() {
    let jobs = await QueueProvider.queue.getRepeatableJobs();
    for (let i = 0; i < jobs.length; i++) {
      await QueueProvider.queue.removeRepeatableByKey(jobs[i].key);
    }    

    const runService = Container.get(RunService);  
    QueueProvider.queue.process('monitor', job => {
      runService.Run({ id: job.data.id });
    });

    let monitorpages = await Monitorpage.findAll({ where: { running: true }});

    for (let i = 0; i < monitorpages.length; i++) {
      await QueueProvider.queue.add('monitor', { id: monitorpages[i].id }, { repeat: { every: monitorpages[i].interval * 1000 }, jobId: monitorpages[i].id });
    }
  }
}