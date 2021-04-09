import { ClearScheduleCommandDTO } from "../../application/dto/ClearScheduleCommandDTO";
import { ScheduleCommandDTO } from "../../application/dto/ScheduleCommandDTO";
import { IScheduleService } from "../../application/interface/IScheduleService";
import { Queue, QueueScheduler } from 'bullmq';
import { Redis } from 'ioredis';

export class ScheduleService implements IScheduleService {
  private queueScheduler: QueueScheduler;
  private queue: Queue;

  constructor(redis: Redis) {
    this.queueScheduler = new QueueScheduler('monitor', { connection: redis });
    this.queue = new Queue('monitor', { connection: redis });
  }

  public async schedule(command: ScheduleCommandDTO): Promise<void> {
    const jobs = await this.queue.getRepeatableJobs();

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].name == command.monitorpageUuid) {
        await this.queue.removeRepeatableByKey(jobs[i].key);
        break;
      }
    }

    await this.queue.add(command.monitorpageUuid, null, { repeat: { every: command.intervalTime * 1000 }});
  }

  public async clearSchedule(command: ClearScheduleCommandDTO): Promise<void> {
    const jobs = await this.queue.getRepeatableJobs();

    for (let i = 0; i < jobs.length; i++) {
      if (jobs[i].name == command.monitorpageUuid) {
        await this.queue.removeRepeatableByKey(jobs[i].key);
        break;
      }
    }
  }

}