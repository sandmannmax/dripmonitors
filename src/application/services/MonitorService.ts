import { IMonitors } from '../monitors/IMonitors';
import { NikeMonitor } from '../monitors/NikeMonitor';

export interface IMonitorService {
  checkMonitorAvailable({ name }: { name: string }): boolean;
  runMonitor({ name, content }: { name: string; content: any }): void;
}

export class MonitorService {
  private monitors: IMonitors;

  constructor(
    nikeMonitor: NikeMonitor
  ) {
    this.monitors = {
      'nike-de': nikeMonitor,
    };
  }

  public checkMonitorAvailable({ name }: { name: string }): boolean {
    return this.monitors.hasOwnProperty(name);
  }

  public runMonitor({ name, content }: { name: string; content: any }): void {
    this.monitors[name].run({ content });
  }
}