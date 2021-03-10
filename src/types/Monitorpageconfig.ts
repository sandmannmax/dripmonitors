import { Monitorpageconfig } from "../models/Monitorpageconfig";
import { GetProcessconfigs_O, Processconfig_O } from "./Processconfig";

export class Monitorpageconfig_O {
  public id!: string;
  public isHtml!: boolean;
  public allSizesAvailable!: boolean;
  public soldOutCheckSizes!: boolean;
  public hasParentProducts!: boolean;
  public hasChildProducts!: boolean;
  public processconfigs!: Processconfig_O[];
}

export function GetMonitorpageconfig_O(monitorpageconfig: Monitorpageconfig): Monitorpageconfig_O {
  let monitorpageconfig_O: Monitorpageconfig_O = new Monitorpageconfig_O();
  monitorpageconfig_O.id = monitorpageconfig.id;
  monitorpageconfig_O.isHtml = monitorpageconfig.isHtml;
  monitorpageconfig_O.allSizesAvailable = monitorpageconfig.allSizesAvailable;
  monitorpageconfig_O.soldOutCheckSizes = monitorpageconfig.soldOutCheckSizes;
  monitorpageconfig_O.hasParentProducts = monitorpageconfig.hasParentProducts;
  monitorpageconfig_O.hasChildProducts = monitorpageconfig.hasChildProducts;
  if (monitorpageconfig.processconfigs)
    monitorpageconfig_O.processconfigs = GetProcessconfigs_O(monitorpageconfig.processconfigs)
  return monitorpageconfig_O;
}

export function GetMonitorpageconfigs_O(monitorpageconfigs: Monitorpageconfig[]): Monitorpageconfig_O[] {
  let monitorpageconfigs_O = new Array<Monitorpageconfig_O>();
  for (let i = 0; i < monitorpageconfigs.length; i++)
    monitorpageconfigs_O.push(GetMonitorpageconfig_O(monitorpageconfigs[i]));
  return monitorpageconfigs_O;
}