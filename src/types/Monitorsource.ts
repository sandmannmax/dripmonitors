import { GetMonitorpage_O, Monitorpage, Monitorpage_O } from "./Monitorpage";
import { GetProduct_O, Product, Product_O } from "./Product";

export class Monitorsource_O {
  public id: string;
  public product?: Product_O;
  public monitorpage?: Monitorpage_O;
  public all: boolean;
}

export class Monitorsource {
  public id: string;
  public monitorId: string;
  public productId?: string;
  public monitorpageId?: string;
  public all: boolean;
}

export function GetMonitorsource_O(monitorsource: Monitorsource, product?: Product, productMonitorpage?: Monitorpage, monitorpage?: Monitorpage): Monitorsource_O {
  let monitorsource_O: Monitorsource_O = new Monitorsource_O();
  monitorsource_O.id = monitorsource.id;
  monitorsource_O.product = GetProduct_O(product, productMonitorpage);
  monitorsource_O.monitorpage = GetMonitorpage_O(monitorpage);
  monitorsource_O.all = monitorsource.all;
  return monitorsource_O;
}