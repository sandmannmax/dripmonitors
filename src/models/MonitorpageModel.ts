import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorpage } from '../types/Monitorpage';
import { Product } from '../types/Product';

const dbProvider = Container.get(DatabaseProvider);

export namespace MonitorpageModel {
  export async function GetMonitorpageVisible({ id }: { id: string }): Promise<Monitorpage> {
    let result = await dbProvider.Get('lsb.monitorpages', { id });
    let monitorpage = result.Item as Monitorpage;
    if (monitorpage != null && monitorpage.visible)
      return monitorpage;
    else
      return null;
  }

  export async function GetMonitorpagesVisible(): Promise<Array<Monitorpage>> {
    let result = await dbProvider.Find('lsb.monitorpages', "", {});
    let monitorpages = [];
    if (result.Items) {
      result.Items.forEach((item: Monitorpage) => {
        if (item.visible)
          monitorpages.push(item);
      });
    }    
    return monitorpages;
  }

  export async function GetMonitorpage({ id }: { id: string }): Promise<Monitorpage> {
    let result = await dbProvider.Get('lsb.monitorpages', { id });
    return result.Item as Monitorpage;
  }

  export async function GetMonitorpages(): Promise<Array<Monitorpage>> {
    let result = await dbProvider.Find('lsb.monitorpages', "", {});
    return result.Items as Array<Monitorpage>;
  }

  export async function CreateMonitorpage({ id, techname, name, url, visible }: { id: string, techname: string, name: string, url: string, visible: boolean }): Promise<Monitorpage> {
    await dbProvider.Insert('lsb.monitorpages', { id, techname, name, url, visible });
    let result = await dbProvider.Get('lsb.monitorpages', { id });
    return result.Item as Monitorpage;
  }

  export async function DeleteMonitorpage({ id }: { id: string }) {
    await dbProvider.Delete('lsb.monitorpages', { id });
  }

  export async function UpdateTechname({ id, techname }: { id: string, techname: string }) {
    await dbProvider.Update('lsb.monitorpages', { id }, "set techname = :techname", { ":techname": techname });
  }

  export async function UpdateName({ id, name }: { id: string, name: string }) {
    await dbProvider.Update('lsb.monitorpages', { id }, "set name = :name", { ":name": name });
  }

  export async function UpdateVisible({ id, visible }: { id: string, visible: boolean }) {
    await dbProvider.Update('lsb.monitorpages', { id }, "set visible = :visible", { ":visible": visible });
  }

  export async function UpdateUrl({ id, url }: { id: string, url: string }) {
    await dbProvider.Update('lsb.monitorpages', { id }, "set url = :url", { ":url": url });
  }

  export async function IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.products', { id });
    return result.Item == null;
  }
}