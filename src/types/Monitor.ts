import { Monitor } from "../models/Monitor";
import { GetRoles_O, Role_O } from "./Role";

export class Monitor_O {
  public id!: string;
  public webHook!: string;
  public botName!: string;
  public botImage!: string;
  public running!: boolean;
  public roles!: Role_O[];
}

export function GetMonitor_O(monitor: Monitor): Monitor_O {
  let monitorO: Monitor_O = new Monitor_O();
  monitorO.id = monitor.id;
  if (monitor.botImage)
    monitorO.botImage = monitor.botImage;
  if (monitor.botName)
    monitorO.botName = monitor.botName;
  if (monitor.webHook)
    monitorO.webHook = monitor.webHook;
  monitorO.running = monitor.running;
  if (monitor.roles)
    monitorO.roles = GetRoles_O(monitor.roles);
  return monitorO;
}

export function GetMonitors_O(monitors: Monitor[]): Monitor_O[] {
  let monitors_O = new Array<Monitor_O>();
  for (let i = 0; i < monitors.length; i++) {
    monitors_O.push(GetMonitor_O(monitors[i]));
  }
  return monitors_O;
}