import { logger } from '../logger';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitor } from '../types/Monitor';
import { Monitorsource } from '../types/Montiorsource';
import { Product } from '../types/Product';

const dbProvider = DatabaseProvider.getInstance();

export class MonitorpageModel {

  public static IsVisible = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.monitorpages', { id });
    return result && result.Item.visible;
  }

  public static Start = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.monitorpages', { id });
    if (result && result.Item && result.Item.currentRunningState) 
      return false;
    
    await dbProvider.Update('lsb.monitorpages', { id }, "set currentRunningState = :crs", { ':crs': true });
    return true;
  }

  public static Stop = async function ({ id }: { id: string }): Promise<void> {
    await dbProvider.Update('lsb.monitorpages', { id }, "set currentRunningState = :crs", { ':crs': false });
  }

  public static NoProxyMessageSent = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.monitorpages', { id });
    if (result && result.Item && result.Item.noProxyMessageSent) 
      return true;
    else
      return false;
  }

  public static UpdateNoProxyMessageSent = async function ({ id, value }: { id: string, value: boolean }): Promise<void> {
    await dbProvider.Update('lsb.monitorpages', { id }, "set noProxyMessageSent = :npms", { ':npms': value });
  }
}