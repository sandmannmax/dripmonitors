export class Monitor_O {
  public webHook: string;
  public botName: string;
  public botImage: string;
}

export class Monitor {
  public _id: string;
  public userId: string;
  public webHook: string;
  public botName: string;
  public botImage: string;
}

export function GetMonitor_O(monitor: Monitor): Monitor_O {
  let monitorO: Monitor_O = new Monitor_O();
  monitorO.botImage = monitor.botImage;
  monitorO.botName = monitor.botName;
  monitorO.webHook = monitor.webHook;
  return monitorO;
}