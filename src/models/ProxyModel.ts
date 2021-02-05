import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Proxy } from '../types/Proxy';

const dbProvider = Container.get(DatabaseProvider);

export namespace ProxyModel {
  export async function GetProxy({ id }: { id: string }): Promise<Proxy> {
    let result = await dbProvider.Get('lsb.proxies', { id });
    return result.Item as Proxy;
  }

  export async function GetProxies(): Promise<Array<Proxy>> {
    let result = await dbProvider.Find('lsb.proxies', "", {});
    return result.Items as Array<Proxy>;
  }

  export async function IsProxyUnused({ address }: { address: string }): Promise<boolean> {
    let result = await dbProvider.Find('lsb.proxies', "address = :address", { ":address": address}, "address-index");
    return result.Count == null || result.Count == 0;
  }

  export async function CreateProxy({ id, address, cc }: { id: string, address: string, cc: string }): Promise<Proxy> {
    await dbProvider.Insert('lsb.proxies', { id, address, cc });
    let result = await dbProvider.Get('lsb.proxies', { id });
    return result.Item as Proxy;
  }

  export async function DeleteProxy({ id }: { id: string }) {
    await dbProvider.Delete('lsb.proxies', { id });
  }

  export async function UpdateProxy({ id, address, cc }: { id: string, address: string, cc: string }) {
    await dbProvider.Update('lsb.monitorpages', { id }, "set address = :address, cc = :cc", { ":address": address, ":cc": cc });
  }

  export async function IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.proxies', { id });
    return result.Item == null;
  }
}