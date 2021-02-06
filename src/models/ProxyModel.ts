import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Proxy } from '../types/Proxy';
import { Cooldown } from '../types/Cooldown';

const dbProvider = DatabaseProvider.getInstance();

export class ProxyModel {

  public static GetRandomProxy = async function ({ monitorpageId }: { monitorpageId: string }): Promise<Proxy> {
    let result = await dbProvider.GetAll('lsb.proxies');
    if (result && result.Items.length > 0) {     
      let proxies: Array<Proxy> = result.Items as Array<Proxy>; 
      let resultCooldowns = await dbProvider.Find('lsb.proxy_cooldowns', "monitorpageId = :monitorpageId", { ":monitorpageId": monitorpageId });
      resultCooldowns.Items.forEach(async (proxyCooldown: Cooldown) => {
        if (proxyCooldown.remaining > 0) {          
          let index = proxies.findIndex(item => item.id == proxyCooldown.proxyId);
          if (index !== -1)
            proxies.splice(index, 1);
          await dbProvider.Update('lsb.proxy_cooldowns', { proxyId: proxyCooldown.proxyId , monitorpageId: proxyCooldown.monitorpageId }, "set remaining = remaining - 1", {});
        }
      });
      let index = Math.floor((Math.random() * proxies.length));
      return proxies[index];
    } else
      return null;
  }

  public static SetCooldown = async function ({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<void> {
    let result = await dbProvider.Get('lsb.proxy_cooldowns', { proxyId, monitorpageId });
    if (result && result.Item) {
      let cooldown = result.Item as Cooldown;
      let counter = cooldown.counter + 1;
      await dbProvider.Update('lsb.proxy_cooldowns', { proxyId, monitorpageId }, "set remaining = :counter, counter = :counter", { ":counter": counter });
    } else {
      let cooldown = new Cooldown();
      cooldown.proxyId = proxyId;
      cooldown.monitorpageId = monitorpageId;
      cooldown.remaining = 1;
      cooldown.counter = 1;
      await dbProvider.Insert('lsb.proxy_cooldowns', cooldown);
    }
  }

  public static ResetCooldown = async function ({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<void> {
    await dbProvider.Update('lsb.proxy_cooldowns', { proxyId, monitorpageId }, "set remaining = :counter, counter = :counter", { ":counter": 0 });
  }

  public static IsCooldown = async function ({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }) {
    return (await dbProvider.Get('lsb.proxy_cooldowns', { proxyId, monitorpageId })).Item != null;
  }
}