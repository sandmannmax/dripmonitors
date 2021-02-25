import { logger } from '../logger';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorrun } from '../types/Monitorrun';

const dbProvider = DatabaseProvider.getInstance();

export class MonitorrunModel {
  public static AddMonitorrun = async function ({ monitorrun }: { monitorrun: Monitorrun }) {
    logger.info('AddMonitorrun ' + JSON.stringify(monitorrun));
    await dbProvider.Insert('lsb.monitorruns', monitorrun.ToDBObject());
  }

  public static IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    logger.info('IsUnused ' + id)
    let result = await dbProvider.Get('lsb.monitorruns', { id });
    logger.info('... ' + JSON.stringify(result));
    return result.Item == null;
  }
}