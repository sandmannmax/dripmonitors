import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Container } from 'typedi';
import { Proxy } from '../types/Proxy';
import { Cooldown } from '../types/Cooldown';

const dbProvider = Container.get(DatabaseProvider);

export namespace ProxyModel {
  
  export async function GetProxies(): Promise<Array<Proxy>> {
    return await dbProvider.Find<Proxy>('m_proxies', {});
  }

  export async function GetRandomProxy({ page }: { page: string }): Promise<Proxy> {
    let result = await dbProvider.Find<Proxy>('m_proxies', {});
    if (result && result.length > 0) {      
      let resultCooldowns = await dbProvider.Find<Cooldown>('m_cooldowns_proxy', { page });
      for (let i = 0; i < resultCooldowns.length; i++) {
        let remaining = resultCooldowns[i].cooldownsRemaining;
        if (remaining > 0) {
          let index = result.indexOf(result.find(item => item._id == resultCooldowns[i].proxyId));
          if (index > -1)
            result.splice(index, 1);
          await dbProvider.Update('m_cooldowns_proxy', { proxyId: resultCooldowns[i].proxyId , page }, { cooldownsRemaining: remaining - 1 });
        } 
      }
      let index = Math.floor((Math.random() * result.length));
      return result[index];
    } else
      return null;
  }

  export async function SetCooldown({ page, proxyId }: { page: string, proxyId: string }): Promise<void> {
    let result = await dbProvider.Find<Cooldown>('m_cooldowns_proxy', { proxyId, page });
    if (!result || (result && result.length == 0)) {
      let cooldown = new Cooldown();
      cooldown.proxyId = proxyId;
      cooldown.page = page;
      cooldown.cooldownsRemaining = 1;
      cooldown.cooldownCounter = 1;
      await dbProvider.Insert('m_cooldowns_proxy', cooldown);
    } else if (result.length == 1) {
      let cooldown = result[0];
      let counter = cooldown.cooldownCounter + 1;
      await dbProvider.Update('m_cooldowns_proxy', { proxyId , page }, { cooldownsRemaining: counter, cooldownCounter: counter })
    } else
      throw new Error(`More than one Cooldown-Object found for ${page} and ${proxyId}`);
  }

  export async function ResetCooldown({ page, proxyId }: { page: string, proxyId: string }): Promise<void> {
    let result = await dbProvider.Find<Cooldown>('m_cooldowns_proxy', { proxyId, page });
    if (result && result.length == 1) {
      let cooldown = result[0];
      await dbProvider.Update('m_cooldowns_proxy', { proxyId , page }, { cooldownsRemaining: 0, cooldownCounter: 0 });
    } else if (result && result.length > 1)
      throw new Error(`More than one Cooldown-Object found for ${page} and ${proxyId}`);
  }

  export async function GetProxy({ _id } : { _id: string }): Promise<Proxy> {
    let result = await dbProvider.Find<Proxy>('m_proxies', { _id });
    return result.length == 1 ? result[0] : null;
  }

  export async function CreateProxy({ address, port } : { address: string, port: number }): Promise<Proxy> {
    await dbProvider.Insert('m_proxies', { address, port });
    let results = await dbProvider.Find<Proxy>('m_proxies', { address, port });
    return results[0];
  }

  export async function IsProxyUnused({ address, port } : { address: string, port: number }): Promise<boolean> {
    let result = await dbProvider.Find<Proxy>('m_proxies', { address, port });
    return result.length == 0;
  }
}