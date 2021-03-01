import { Proxy } from '../types/Proxy';
import { Cooldown } from '../types/Cooldown';
import { IDatabaseProvider } from '../interfaces/provider/IDatabaseProvider';
import { IProxyModel } from '../interfaces/models/IProxyModel';

export class ProxyModel implements IProxyModel {
  private readonly dbProvider: IDatabaseProvider;

  constructor(dbProvider: IDatabaseProvider) {
    this.dbProvider = dbProvider;
  }

  async GetProxy({ id }: { id: string }): Promise<Proxy> {
    let result = await this.dbProvider.Get('lsb.proxies', { id });
    return result.Item as Proxy;
  }

  async GetProxies(): Promise<Array<Proxy>> {
    let result = await this.dbProvider.GetAll('lsb.proxies');
    return result.Items as Array<Proxy>;
  }

  async CreateProxy({ id, address, cc }: { id: string, address: string, cc: string }): Promise<Proxy> {
    await this.dbProvider.Insert('lsb.proxies', { id, address, cc });
    let result = await this.dbProvider.Get('lsb.proxies', { id });
    return result.Item as Proxy;
  }

  async UpdateProxy({ id, address, cc }: { id: string, address: string, cc: string }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpages', { id }, "set address = :address, cc = :cc", { ":address": address, ":cc": cc });
  }
  
  async DeleteProxy({ id }: { id: string }): Promise<void> {
    await this.dbProvider.Delete('lsb.proxies', { id });
  }

  async IsProxyUnused({ address }: { address: string }): Promise<boolean> {
    let result = await this.dbProvider.Find('lsb.proxies', "address = :address", { ":address": address}, "address-index");
    return result.Count == null || result.Count == 0;
  }  

  async IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.proxies', { id });
    return result.Item == null;
  }  
}