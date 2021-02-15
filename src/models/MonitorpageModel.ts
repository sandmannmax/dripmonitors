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
}