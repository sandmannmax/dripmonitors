import { Proxy } from '../../src/types/Proxy';

export class ProxyModel {

  GetProxy = async function ({ id }: { id: string }): Promise<Proxy> {
    let result = await this.dbProvider.Get('lsb.proxies', { id });
    return result.Item as Proxy;
  }

  GetProxies = async function (): Promise<Array<Proxy>> {
    let result = await this.dbProvider.Find('lsb.proxies', "", {});
    return result.Items as Array<Proxy>;
  }

  IsProxyUnused = async function ({ address }: { address: string }): Promise<boolean> {
    let result = await this.dbProvider.Find('lsb.proxies', "address = :address", { ":address": address}, "address-index");
    return result.Count == null || result.Count == 0;
  }

  CreateProxy = async function ({ id, address, cc }: { id: string, address: string, cc: string }): Promise<Proxy> {
    await this.dbProvider.Insert('lsb.proxies', { id, address, cc });
    let result = await this.dbProvider.Get('lsb.proxies', { id });
    return result.Item as Proxy;
  }

  DeleteProxy = async function ({ id }: { id: string }) {
    await this.dbProvider.Delete('lsb.proxies', { id });
  }

  UpdateProxy = async function ({ id, address, cc }: { id: string, address: string, cc: string }) {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set address = :address, cc = :cc", { ":address": address, ":cc": cc });
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.proxies', { id });
    return result.Item == null;
  }
}