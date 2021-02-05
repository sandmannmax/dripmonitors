export class Monitorpage_O {
  public id: string;
  public name: string;
  public url: string;
}

export class Monitorpage {
  public id: string;
  public name: string;
  public url: string;
  public techname: string;
  public visible: boolean;
  public running: boolean;
  public interval: number;
}

export function GetMonitorpage_O(monitorpage: Monitorpage): Monitorpage_O {
  if (monitorpage) {
    let monitorpage_O: Monitorpage_O = new Monitorpage_O();
    monitorpage_O.id = monitorpage.id;
    monitorpage_O.name = monitorpage.name;
    monitorpage_O.url = monitorpage.url;
    return monitorpage_O;
  } else
    return undefined;
}