import { Monitorsource } from "../models/Monitorsource";
import { GetMonitorpage_O, Monitorpage_O } from "./Monitorpage";
import { GetProduct_O, Product_O } from "./Product";

export class Monitorsource_O {
  public id!: string;
  public product?: Product_O;
  public monitorpage?: Monitorpage_O;
  public all!: boolean;
}

export function GetMonitorsource_O(monitorsource: Monitorsource): Monitorsource_O {
  let monitorsource_O: Monitorsource_O = new Monitorsource_O();
  monitorsource_O.id = monitorsource.id;
  if (monitorsource.product)
    monitorsource_O.product = GetProduct_O(monitorsource.product);
  if (monitorsource.monitorpage)
    monitorsource_O.monitorpage = GetMonitorpage_O(monitorsource.monitorpage);
  monitorsource_O.all = monitorsource.all;
  return monitorsource_O;
}

export function GetMonitorsources_O(monitorsources: Monitorsource[]): Monitorsource_O[] {
  let monitorsources_O = new Array<Monitorsource_O>();
  for (let i = 0; i < monitorsources.length; i++) {
    monitorsources_O.push(GetMonitorsource_O(monitorsources[i]));
  }
  return monitorsources_O;
}