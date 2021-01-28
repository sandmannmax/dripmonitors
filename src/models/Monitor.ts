import { DatabaseProvider } from '../provider/DatabaseProvider';
import { UserMonitor } from '../types/UserMonitor';
import { Monitor } from '../types/Monitor';
import { Job } from '../types/Job';
import { Container } from 'typedi';

const dbProvider = Container.get(DatabaseProvider);

export namespace MonitorModel {
  
  export async function GetUserMonitors(): Promise<Array<UserMonitor>> {
    return await dbProvider.Find<UserMonitor>('monitors', {});
  }

  export async function GetMonitor({ _id } : { _id: string }): Promise<Array<Monitor>> {
    return await dbProvider.Find<Monitor>('m_monitors', { _id });
  }

  export async function GetMonitors(): Promise<Array<Monitor>> {
    return await dbProvider.Find<Monitor>('m_monitors', {});
  }

  export async function GetMonitorJob({ monitorId } : { monitorId: string }): Promise<Array<Job>> {
    return await dbProvider.Find<Job>('m_monitor_jobs', { monitorId });
  }

  export async function DeleteMonitorJob({ monitorId, key } : { monitorId: string, key: string }): Promise<void> {
    await dbProvider.Delete('m_monitor_jobs', { monitorId, key });
  }

  export async function InsertMonitorJob({ monitorId, key, interval } : { monitorId: string, key: string, interval: number }): Promise<Job> {
    await dbProvider.Insert('m_monitor_jobs', { monitorId, key, interval });
    let results = await dbProvider.Find<Job>('m_monitor_jobs', { monitorId, key, interval });
    return results[0];
  }
}