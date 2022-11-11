import { Monitor } from "../models/Monitor";
import { GetMonitorsources_O, Monitorsource_O } from "./Monitorsource";
import { GetRoles_O, Role_O } from "./Role";

export class Monitor_O {
  public id!: string;
  public webHook!: string;
  public botName!: string;
  public botImage!: string;
  public running!: boolean;
  public roles!: Role_O[];
  public monitorsources!: Monitorsource_O[];
}

export async function GetMonitor_O(monitor: Monitor): Promise<Monitor_O> {
  let monitorO: Monitor_O = new Monitor_O();
  monitorO.id = monitor.id;
  if (monitor.botImage)
    monitorO.botImage = monitor.botImage;
  if (monitor.botName)
    monitorO.botName = monitor.botName;
  if (monitor.webHook)
    monitorO.webHook = monitor.webHook;
  monitorO.running = monitor.running;
  let roles = await monitor.getRoles();
  if (roles)
    monitorO.roles = GetRoles_O(roles);
  let monitorsources = await monitor.getMonitorsources();
  if (monitorsources)
    monitorO.monitorsources = await GetMonitorsources_O(monitorsources);
  return monitorO;
}

export async function GetMonitors_O(monitors: Monitor[]): Promise<Monitor_O[]> {
  let monitors_O = new Array<Monitor_O>();
  for (let i = 0; i < monitors.length; i++) {
    monitors_O.push(await GetMonitor_O(monitors[i]));
  }
  return monitors_O;
}