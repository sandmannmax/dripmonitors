import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorpage } from '../types/Monitorpage';


export class MonitorpageModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  GetMonitorpageVisible = async function ({ id }: { id: string }): Promise<Monitorpage> {
    let result = await this.dbProvider.Get('lsb.monitorpages', { id });
    let monitorpage = result.Item as Monitorpage;
    if (monitorpage != null && monitorpage.visible)
      return monitorpage;
    else
      return null;
  }

  GetMonitorpagesVisible = async function (): Promise<Array<Monitorpage>> {
    let result = await this.dbProvider.GetAll('lsb.monitorpages');
    let monitorpages = [];
    if (result.Items) {
      result.Items.forEach((item: Monitorpage) => {
        if (item.visible)
          monitorpages.push(item);
      });
    }    
    return monitorpages;
  }

  GetMonitorpage = async function ({ id }: { id: string }): Promise<Monitorpage> {
    let result = await this.dbProvider.Get('lsb.monitorpages', { id });
    return result.Item as Monitorpage;
  }

  GetMonitorpages = async function (): Promise<Array<Monitorpage>> {
    let result = await this.dbProvider.GetAll('lsb.monitorpages');
    return result.Items as Array<Monitorpage>;
  }

  CreateMonitorpage = async function ({ id, techname, name, url, visible }: { id: string, techname: string, name: string, url: string, visible: boolean }): Promise<Monitorpage> {
    await this.dbProvider.Insert('lsb.monitorpages', { id, techname, name, url, visible });
    let result = await this.dbProvider.Get('lsb.monitorpages', { id });
    return result.Item as Monitorpage;
  }

  DeleteMonitorpage = async function ({ id }: { id: string }) {
    await this.dbProvider.Delete('lsb.monitorpages', { id });
  }

  UpdateTechname = async function ({ id, techname }: { id: string, techname: string }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set techname = :techname", { ":techname": techname });
  }

  UpdateName = async function ({ id, name }: { id: string, name: string }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set name = :name", { ":name": name });
  }

  UpdateVisible = async function ({ id, visible }: { id: string, visible: boolean }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set visible = :visible", { ":visible": visible });
  }

  UpdateUrl = async function ({ id, url }: { id: string, url: string }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set url = :url", { ":url": url });
  }

  UpdateRunning = async function ({ id, running, interval }: { id: string, running: boolean, interval: number }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set running = :running, #iv = :interval", { ":running": running, ":interval": interval }, null, { "#iv": "interval" });
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.products', { id });
    return result.Item == null;
  }
}