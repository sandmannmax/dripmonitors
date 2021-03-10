import { Monitorpage } from "../models/Monitorpage";
import {  GetMonitorpageconfig_O, Monitorpageconfig_O } from "./Monitorpageconfig";
import { GetUrls_O, Url_O } from "./Url";

export class Monitorpage_O {
  public id!: string;
  public name!: string;
}

export class Monitorpage_OA {
  public id!: string;
  public name!: string;
  public cc!: string;
  public techname!: string;
  public visible!: boolean;
  public running!: boolean;
  public interval!: number;
  public monitorpageconfig?: Monitorpageconfig_O;
  public urls!: Array<Url_O>;
}

export function GetMonitorpage_O(monitorpage: Monitorpage): Monitorpage_O {
  let monitorpage_O: Monitorpage_O = new Monitorpage_O();
  monitorpage_O.id = monitorpage.id;
  monitorpage_O.name = monitorpage.name;
  return monitorpage_O;
}

export function GetMonitorpages_O(monitorpages: Monitorpage[]): Monitorpage_O[] {
  let monitorpages_O: Array<Monitorpage_O> = new Array<Monitorpage_O>();
  for (let i = 0; i < monitorpages.length; i++)
    monitorpages_O.push(GetMonitorpage_O(monitorpages[i]));
  return monitorpages_O;
}

export function GetMonitorpage_OA(monitorpage: Monitorpage): Monitorpage_OA {
  let monitorpage_OA: Monitorpage_OA = new Monitorpage_OA();
  monitorpage_OA.id = monitorpage.id;
  monitorpage_OA.name = monitorpage.name;
  monitorpage_OA.cc = monitorpage.cc;
  monitorpage_OA.techname = monitorpage.techname;
  monitorpage_OA.visible = monitorpage.visible;
  monitorpage_OA.running = monitorpage.running;
  monitorpage_OA.interval = monitorpage.interval;
  if (monitorpage.urls)
    monitorpage_OA.urls = GetUrls_O(monitorpage.urls);
  if (monitorpage.monitorpageconfig)
    monitorpage_OA.monitorpageconfig = GetMonitorpageconfig_O(monitorpage.monitorpageconfig);
  return monitorpage_OA;
}

export function GetMonitorpages_OA(monitorpages: Monitorpage[]): Monitorpage_OA[] {
  let monitorpages_OA: Array<Monitorpage_OA> = new Array<Monitorpage_OA>();
  for (let i = 0; i < monitorpages.length; i++)
    monitorpages_OA.push(GetMonitorpage_OA(monitorpages[i]));
  return monitorpages_OA;
}