import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorrun } from '../types/Monitorrun';

const dbProvider = DatabaseProvider.getInstance();

export class MonitorrunModel {

  public static AddMonitorrun = async function ({ monitorrun }: { monitorrun: Monitorrun }) {
    await dbProvider.Insert('lsb.monitorruns', monitorrun.ToDBObject());
  }
}