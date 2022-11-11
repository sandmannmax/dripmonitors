import pino from 'pino';
import { Monitorpage } from '../models/Monitorpage';
import { Proxy } from '../models/Proxy';

export class ProxyService {
  private logger: pino.Logger;

  constructor() {
    this.logger = pino();
  }

  async GetRandomProxy({ monitorpage }: { monitorpage: Monitorpage }): Promise<Proxy | null> {
    let proxies = await Proxy.findAll({ where: { cc: monitorpage.cc }});
    if (!proxies || proxies.length == 0)  
      return null;

    let randomIndex = Math.floor((Math.random() * proxies.length));
    return proxies[randomIndex];
  }
}