import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Container } from 'typedi';
import { Proxy } from '../types/Proxy';

const dbProvider = Container.get(DatabaseProvider);

export namespace ProxyModel {
  
  export async function GetProxies(): Promise<Array<Proxy>> {
    return await dbProvider.Find<Proxy>('m_proxies', {});
  }

  export async function GetRandomProxy(): Promise<Proxy> {
    let result = await dbProvider.Find<Proxy>('m_proxies', {});
    if (result && result.length > 0) {
      let index = Math.floor((Math.random() * result.length));
      return result[index];
    } else
      return null;
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