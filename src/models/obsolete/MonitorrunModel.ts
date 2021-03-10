import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorrun } from '../types/Monitorrun';

export class MonitorrunModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  async AddMonitorrun({ monitorrun }: { monitorrun: Monitorrun }) {
    await this.dbProvider.Insert('lsb.monitorruns', monitorrun.ToDBObject());
  }

  async IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitorruns', { id });
    return result.Item == null;
  }
}