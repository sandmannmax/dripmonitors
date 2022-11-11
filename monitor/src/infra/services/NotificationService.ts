import { NotifySubjectDTO } from "../../application/dto/NotifySubjectDTO";
import { INotificationService } from "../../application/interface/INotificationService";
import { Queue, QueueScheduler } from 'bullmq';
import { Redis } from 'ioredis';

export class NotificationService implements INotificationService {
  private queueScheduler: QueueScheduler;
  private queue: Queue;

  constructor(redis: Redis) {
    this.queueScheduler = new QueueScheduler('notification', { connection: redis });
    this.queue = new Queue('notification', { connection: redis });
  }

  public async notify(subject: NotifySubjectDTO): Promise<void> {
    await this.queue.add('product', { subject });
  }
}