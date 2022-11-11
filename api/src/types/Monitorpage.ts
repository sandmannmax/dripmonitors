import { Monitorpage } from "../models/Monitorpage";
import { GetUrls_O, Url_O } from "./Url";

export class Monitorpage_O {
  public id!: string;
  public name!: string;
}

export class Monitorpage_OA {
  public id!: string;
  public name!: string;
  public cc!: string;
  public functionName!: string;
  public visible!: boolean;
  public running!: boolean;
  public interval!: number;
  public urls!: Array<Url_O>;
  public isHtml!: boolean;
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

export async function GetMonitorpage_OA(monitorpage: Monitorpage): Promise<Monitorpage_OA> {
  let monitorpage_OA: Monitorpage_OA = new Monitorpage_OA();
  monitorpage_OA.id = monitorpage.id;
  monitorpage_OA.name = monitorpage.name;
  monitorpage_OA.cc = monitorpage.cc;
  monitorpage_OA.functionName = monitorpage.functionName;
  monitorpage_OA.visible = monitorpage.visible;
  monitorpage_OA.running = monitorpage.running;
  monitorpage_OA.interval = monitorpage.interval;
  monitorpage_OA.isHtml = monitorpage.isHtml;
  let urls = await monitorpage.getUrls();
  if (urls)
    monitorpage_OA.urls = GetUrls_O(urls);
  return monitorpage_OA;
}

export async function GetMonitorpages_OA(monitorpages: Monitorpage[]): Promise<Monitorpage_OA[]> {
  let monitorpages_OA: Array<Monitorpage_OA> = new Array<Monitorpage_OA>();
  for (let i = 0; i < monitorpages.length; i++)
    monitorpages_OA.push(await GetMonitorpage_OA(monitorpages[i]));
  return monitorpages_OA;
}