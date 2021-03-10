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

  CreateMonitorpage = async function ({ id, techname, name, cc, visible, monitorpageconfigId }: { id: string, techname: string, name: string, cc: string, visible: boolean, monitorpageconfigId: string }): Promise<Monitorpage> {
    await this.dbProvider.Insert('lsb.monitorpages', { id, techname, name, cc, visible, monitorpageconfigId, running: false, interval: 0 });
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

  UpdateCC = async function ({ id, cc }: { id: string, cc: string }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set cc = :cc", { ":cc": cc });
  }

  UpdateMonitorpageconfigId = async function ({ id, monitorpageconfigId }: { id: string, monitorpageconfigId: string }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set monitorpageconfigId = :monitorpageconfigId", { ":monitorpageconfigId": monitorpageconfigId });
  }

  UpdateRunning = async function ({ id, running, interval }: { id: string, running: boolean, interval: number }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set running = :running, #iv = :interval", { ":running": running, ":interval": interval }, null, { "#iv": "interval" });
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.products', { id });
    return result.Item == null;
  }

  async IsVisible({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitorpages', { id });
    return result && result.Item.visible;
  }

  async Start({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitorpages', { id });
    if (result && result.Item && result.Item.currentRunningState) 
      return false;
    
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set currentRunningState = :crs", { ':crs': true });
    return true;
  }

  async Stop({ id }: { id: string }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set currentRunningState = :crs", { ':crs': false });
  }

  async NoProxyMessageSent({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitorpages', { id });
    if (result && result.Item && result.Item.noProxyMessageSent) 
      return true;
    else
      return false;
  }

  async UpdateNoProxyMessageSent({ id, value }: { id: string, value: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set noProxyMessageSent = :npms", { ':npms': value });
  }
}