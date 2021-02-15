import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitor } from '../types/Monitor';
import { Monitorsource } from '../types/Montiorsource';
import { Product } from '../types/Product';

const dbProvider = DatabaseProvider.getInstance();

export class MonitorModel {

  public static GetMonitors = async function ({ product, monitorpageId }: { product: Product, monitorpageId: string }): Promise<Array<Monitor>> {
    let monitors: Array<Monitor> = [];
    let monitorsources: Array<Monitorsource> = [];

    let result = await dbProvider.Scan('lsb.monitorsources', "#a = :all", { ":all": true }, { '#a': 'all' });
    if (result.Items != null)
      monitorsources.push(...(result.Items as Array<Monitorsource>));

    if (product) {
      result = await dbProvider.Scan('lsb.monitorsources', "monitorpageId = :monitorpageId", { ":monitorpageId": monitorpageId });
      if (result.Items != null)
      monitorsources.push(...(result.Items as Array<Monitorsource>));
    }

    if (product) {
      result = await dbProvider.Scan('lsb.monitorsources', "productId = :productId", { ":productId": product.id });
      if (result.Items != null)
      monitorsources.push(...(result.Items as Array<Monitorsource>));
    }

    monitorsources.forEach(async (monitorsource) => {
      let index = monitors.findIndex(monitor => monitor.id == monitorsource.id);

      if (index === -1) {
        let result = await dbProvider.Get('lsb.monitors', { id: monitorsource.monitorId });
        monitors.push(result.Item as Monitor);
      }
    });

    return monitors;
  }
}