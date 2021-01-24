import { Queue } from 'bull';
import bull from 'bull';

export class QueueService {
  private queue;

  constructor() {
    this.queue = new bull('queue', 'redis://redis:6379');
  }
  
}

