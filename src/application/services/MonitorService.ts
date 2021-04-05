import { RunMonitorCommandDTO } from '../dto/RunMonitorCommandDTO';
import { AfewMonitor } from '../monitors/AfewMonitor';
import { IMonitors } from '../monitors/IMonitors';
import { NikeMonitor } from '../monitors/NikeMonitor';
import { SupremeMonitor } from '../monitors/SupremeMonitor';
import { ZalandoMonitor } from '../monitors/ZalandoMonitor';
import { FootlockerMonitor } from '../monitors/FootlockerMonitor';

export interface IMonitorService {
  checkMonitorAvailable(name: string): boolean;
  runMonitor(name: string, command: RunMonitorCommandDTO): void;
}

export class MonitorService implements IMonitorService {
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

  public checkMonitorAvailable(name: string): boolean {
    return this.monitors.hasOwnProperty(name);
  }

  public runMonitor(name: string, command: RunMonitorCommandDTO): void {
    this.monitors[name].run(command);
  }
}