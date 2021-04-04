import { MonitorJobContentDTO } from '../dto/MonitorJobContentDTO';
import { AfewMonitor } from '../monitors/AfewMonitor';
import { IMonitors } from '../monitors/IMonitors';
import { NikeMonitor } from '../monitors/NikeMonitor';
import { SupremeMonitor } from '../monitors/SupremeMonitor';
import { ZalandoMonitor } from '../monitors/ZalandoMonitor';
import { FootlockerMonitor } from '../monitors/FootlockerMonitor';

export interface IMonitorService {
  checkMonitorAvailable({ name }: { name: string }): boolean;
  runMonitor({ name, content }: { name: string; content: MonitorJobContentDTO }): void;
}

export class MonitorService {
  private monitors: IMonitors;

  constructor(
    nikeMonitor: NikeMonitor,
    supremeMonitor: SupremeMonitor,
    zalandoMonitor: ZalandoMonitor,
    afewMonitor: AfewMonitor,
    footlockerMonitor: FootlockerMonitor,
  ) {
    this.monitors = {
      'nike-de': nikeMonitor,
      'supreme-eu': supremeMonitor,
      'zalando-de': zalandoMonitor,
      'afew': afewMonitor,
      'footlocker-de': footlockerMonitor,
    };
  }

  public checkMonitorAvailable({ name }: { name: string }): boolean {
    return this.monitors.hasOwnProperty(name);
  }

  public runMonitor({ name, content }: { name: string; content: MonitorJobContentDTO }): void {
    this.monitors[name].run({ content });
  }
}