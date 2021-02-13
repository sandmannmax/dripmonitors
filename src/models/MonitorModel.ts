import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitor } from '../types/Monitor';
import { Product } from '../types/Product';

const dbProvider = DatabaseProvider.getInstance();

export class MonitorModel {

  public static GetMonitors = async function ({ product, monitorpageId }: { product: Product, monitorpageId: string }): Promise<Array<Monitor>> {
    let monitors: Array<Monitor> = [];

    let result = await dbProvider.Scan('lsb.monitors', "all = :all", { ":all": true });
    if (result.Items != null)
      monitors.push(...(result.Items as Array<Monitor>));

    result = await dbProvider.Scan('lsb.monitors', "monitorpageId = :monitorpageId", { ":monitorpageId": monitorpageId });
    if (result.Items != null)
      monitors.push(...(result.Items as Array<Monitor>));

    result = await dbProvider.Scan('lsb.monitors', "productId = :productId", { ":productId": product.id });
    if (result.Items != null)
      monitors.push(...(result.Items as Array<Monitor>));

    return monitors;
  }
}