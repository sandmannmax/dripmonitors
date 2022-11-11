import { Proxy } from "../models/Proxy"

export class Proxy_O {
  public id!: string;
  public address!: string;
  public cc!: string;
}

export async function GetProxy_O(proxy: Proxy): Promise<Proxy_O> {
  let proxy_O: Proxy_O = new Proxy_O();
  proxy_O.id = proxy.id;
  proxy_O.address = proxy.address;
  proxy_O.cc = proxy.cc;
  return proxy_O;
}

export async function GetProxies_O(proxies: Proxy[]): Promise<Proxy_O[]> {
  let proxies_O = new Array<Proxy_O>();
  for (let i = 0; i < proxies.length; i++) {
    proxies_O.push(await GetProxy_O(proxies[i]));
  }
  return proxies_O;
}