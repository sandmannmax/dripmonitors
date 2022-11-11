import { IMonitorpageService } from "../../application/services/MonitorpageService";
import { Job, Worker } from 'bullmq';
import { Redis } from 'ioredis';
import { logger } from "../../util/logger";

export class MonitorpageRunController {
  private monitorpageService: IMonitorpageService;
  private worker: Worker;
  private notificatioWorker: Worker;

  constructor(monitorpageService: IMonitorpageService, redis: Redis) {
    this.monitorpageService = monitorpageService;
    this.worker = new Worker('monitor', async (job) => this.execute(job), { connection: redis });
    this.notificatioWorker = new Worker('notification', async (job) => this.jobLog(job), { connection: redis });
  }

  private async execute(job: Job<any, any, string>): Promise<void> {
    const monitorpageUuid = job.name;
    await this.monitorpageService.runMonitorpage(monitorpageUuid);
  }

  private async jobLog(job: Job<any, any, string>): Promise<void> {
    logger.info(job);
  }
}