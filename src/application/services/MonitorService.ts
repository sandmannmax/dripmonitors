import { RunMonitorCommandDTO } from '../dto/RunMonitorCommandDTO';
import { AfewMonitor } from '../monitors/AfewMonitor';
import { IMonitors } from '../monitors/IMonitors';
import { NikeMonitor } from '../monitors/NikeMonitor';
import { SupremeMonitor } from '../monitors/SupremeMonitor';
import { ZalandoMonitor } from '../monitors/ZalandoMonitor';
import { FootlockerMonitor } from '../monitors/FootlockerMonitor';
import { SoleboxMonitor } from '../monitors/SoleboxMonitor';
import { SnipesMonitor } from '../monitors/SnipesMonitor';
import { IScraperService } from '../interface/IScraperService';
import { IProductRepo } from '../../domain/repos/IProductRepo';
import { IFilterRepo } from '../../domain/repos/IFilterRepo';
import { INotificationService } from '../interface/INotificationService';

export interface IMonitorService {
  checkMonitorAvailable(name: string): boolean;
  runMonitor(name: string, command: RunMonitorCommandDTO): void;
}

export class MonitorService implements IMonitorService {
  private monitors: IMonitors;

  constructor(
    scraperService: IScraperService, 
    productRepo: IProductRepo, 
    filterRepo: IFilterRepo, 
    discordService: INotificationService,
  ) {
    const nikeDeMonitor = new NikeMonitor('nike-de', scraperService, productRepo, filterRepo, discordService);
    const supremeMonitor = new SupremeMonitor('supreme-eu', scraperService, productRepo, filterRepo, discordService);
    const zalandoMonitor = new ZalandoMonitor('zalando-de', scraperService, productRepo, filterRepo, discordService);
    const afewMonitor = new AfewMonitor('afew', scraperService, productRepo, filterRepo, discordService);
    const footlockerMonitor = new FootlockerMonitor('footlocker-de', scraperService, productRepo, filterRepo, discordService);
    // const soleboxMonitor = new SoleboxMonitor(scraperService, productRepo, filterRepo, discordService);
    // const snipesMonitor = new SnipesMonitor(scraperService, productRepo, filterRepo, discordService);

    this.monitors = {
      'nike-de': nikeDeMonitor,
      'supreme-eu': supremeMonitor,
      'zalando-de': zalandoMonitor,
      'afew': afewMonitor,
      'footlocker-de': footlockerMonitor,
    };
  }

  public checkMonitorAvailable(name: string): boolean {
    return this.monitors.hasOwnProperty(name);
  }

  public runMonitor(name: string, command: RunMonitorCommandDTO): void {
    this.monitors[name].run(command);
  }
}