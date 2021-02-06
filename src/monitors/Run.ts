import { logger } from "../logger";
import { ProductModel } from "../models/ProductModel";
import { ProxyModel } from "../models/ProxyModel";
import { RunningTrackerService } from "../services/RunningTrackerService";
import { Product } from "../types/Product";

export const Run = async function ({ id, techname }: { id: string, techname: string}) {
  try {
    let canStart = RunningTrackerService.Start(id);

    if (!canStart)
      return;

    const proxy = await ProxyModel.GetRandomProxy({ monitorpageId: id });

    if (!proxy) {
      logger.error(`${techname} - ${id}: No Proxy Available`);
      RunningTrackerService.Stop(id);
      return;
    }

    // Getting Products with logic to differ for the monitors
    let products: Array<Product> = [];//await GetItems(proxyString);

    if (products == null) {
      await ProxyModel.SetCooldown({ proxyId: proxy.id, monitorpageId: id });
      RunningTrackerService.Stop(id);
      return;
    }

    if (await ProxyModel.IsCooldown({ proxyId: proxy.id, monitorpageId: id }))
      await ProxyModel.ResetCooldown({ proxyId: proxy.id, monitorpageId: id });

    await ProductModel.SetProducts({ products });
  
    RunningTrackerService.Stop(id);
  }
  catch (e) {
    logger.error(`${techname} - ${id}: Error - ${JSON.stringify(e)}`);
    RunningTrackerService.Stop(id);
  }    
}