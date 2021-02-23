export class Monitor_O {
  public id: string;
  public webHook: string;
  public botName: string;
  public botImage: string;
  public running: boolean;
  public role: string;
}

export class Monitor {
  public id: string;
  public userId: string;
  public webHook: string;
  public botName: string;
  public botImage: string;
  public running: boolean;
  public role: string;
}

export function GetMonitor_O(monitor: Monitor): Monitor_O {
  let monitorO: Monitor_O = new Monitor_O();
  monitorO.id = monitor.id;
  monitorO.botImage = monitor.botImage;
  monitorO.botName = monitor.botName;
  monitorO.webHook = monitor.webHook;
  monitorO.running = monitor.running;
  monitorO.role = monitor.role;
  return monitorO;
}