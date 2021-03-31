import pino, { Logger } from 'pino';
import { IMonitors } from '../monitors/IMonitors';
import { NikeMonitor } from '../monitors/NikeMonitor';

export class MonitorService {
  private logger: Logger;
  private monitors: IMonitors;

  constructor(
    nikeMonitor: NikeMonitor
  ) {
    this.logger = pino();
    this.monitors = {
      'nike-de': nikeMonitor,
    };
  }

  public CheckMonitorAvailable({ name }: { name: string }): boolean {
    return this.monitors.hasOwnProperty(name);
  }

  public RunMonitor({ name, content }: { name: string; content: any }) {
    this.monitors[name].run({ content });
  }
}