import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorrun } from '../types/Monitorrun';

const dbProvider = DatabaseProvider.getInstance();

export class MonitorrunModel {
  public static AddMonitorrun = async function ({ monitorrun }: { monitorrun: Monitorrun }) {
    await dbProvider.Insert('lsb.monitorruns', monitorrun.ToDBObject());
  }

  public static IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.monitorruns', { id });
    return result.Item == null;
  }
}