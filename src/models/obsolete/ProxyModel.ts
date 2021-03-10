import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Proxy } from '../types/Proxy';
import { Proxycooldown } from '../types/Proxycooldown'

export class ProxyModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  GetProxy = async function ({ id }: { id: string }): Promise<Proxy> {
    let result = await this.dbProvider.Get('lsb.proxies', { id });
    return result.Item as Proxy;
  }

  GetProxies = async function (): Promise<Array<Proxy>> {
    let result = await this.dbProvider.GetAll('lsb.proxies');
    return result.Items as Array<Proxy>;
  }

  async GetRandomProxy({ monitorpageId }: { monitorpageId: string }): Promise<Proxy> {
    let result = await this.dbProvider.GetAll('lsb.proxies');
    if (result && result.Items.length > 0) {     
      let proxies: Array<Proxy> = result.Items as Array<Proxy>; 
      let resultCooldowns = await this.dbProvider.Find('lsb.proxy_cooldowns', "monitorpageId = :monitorpageId", { ":monitorpageId": monitorpageId }, "monitorpageId-index");
      resultCooldowns.Items.forEach(async (proxyCooldown: Proxycooldown) => {
        if (proxyCooldown.remaining > 0) {          
          let index = proxies.findIndex(item => item.id == proxyCooldown.proxyId);
          if (index !== -1)
            proxies.splice(index, 1);
          await this.dbProvider.Update('lsb.proxy_cooldowns', { proxyId: proxyCooldown.proxyId , monitorpageId: proxyCooldown.monitorpageId }, "set remaining = :remaining", { ':remaining': proxyCooldown.remaining - 1 });
        }
      });
      let index = Math.floor((Math.random() * proxies.length));
      return proxies[index];
    } else
      return null;
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

  async SetCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<void> {
    let result = await this.dbProvider.Get('lsb.proxy_cooldowns', { proxyId, monitorpageId });
    if (result && result.Item) {
      let cooldown = result.Item as Proxycooldown;
      let counter = cooldown.counter + 1;
      await this.dbProvider.Update('lsb.proxy_cooldowns', { proxyId, monitorpageId }, "set remaining = :counter, #c = :counter", { ":counter": counter }, null, { '#c': 'counter' });
    } else {
      let cooldown = new Proxycooldown();
      cooldown.proxyId = proxyId;
      cooldown.monitorpageId = monitorpageId;
      cooldown.remaining = 1;
      cooldown.counter = 1;
      await this.dbProvider.Insert('lsb.proxy_cooldowns', cooldown);
    }
  }

  async ResetCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<void> {
    await this.dbProvider.Update('lsb.proxy_cooldowns', { proxyId, monitorpageId }, "set remaining = :counter, #c = :counter", { ":counter": 0 }, null, { '#c': 'counter' });
  }

  async IsCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }) {
    return (await this.dbProvider.Get('lsb.proxy_cooldowns', { proxyId, monitorpageId })).Item != null;
  }
}