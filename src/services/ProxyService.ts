import { Service, Container, Inject } from 'typedi';
import { IResult } from '../types/IResult';
import { async } from 'crypto-random-string';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';
import { Monitorpage } from '../models/Monitorpage';
import { Queue } from 'bull';
import { Proxy } from '../models/Proxy';
import { Op } from 'sequelize';
import { Cooldown } from '../models/Cooldown';

export class ProxyService {

  async GetRandomProxy({ monitorpage }: { monitorpage: Monitorpage }): Promise<Proxy | null> {
    let cooldowns = monitorpage.cooldowns;
    let proxyCooldownIds = new Array<string>();
    if (cooldowns)
      proxyCooldownIds = cooldowns.map(o => o.id);
    let proxies = await Proxy.findAll({ where: { id: { [Op.notIn]: proxyCooldownIds }, cc: monitorpage.cc }});
    if (!proxies || proxies.length == 0)  
      return null;

    let randomIndex = Math.floor((Math.random() * proxies.length));
    return proxies[randomIndex];
  }

  async ReduceCooldowns({ monitorpage }: { monitorpage: Monitorpage }): Promise<void> {
    let cooldowns = monitorpage.cooldowns;
    if (cooldowns) {
      for (let i = 0; i < cooldowns.length; i++) {
        if (cooldowns[i].remaining  > 0) {
          cooldowns[i].remaining -= 1
          cooldowns[i].save();
        }
      }
    }
  }

  async SetCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }) {
    let cooldown = await Cooldown.findOne({ where: { proxyId, monitorpageId }});
    if (cooldown)
      await cooldown.update({ counter: cooldown.counter + 1, remaining: cooldown.counter + 1 });
    else
      await Cooldown.create({ proxyId, monitorpageId, counter: 1, remaining: 1 });
  }

  async ResetCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }) {
    let cooldown = await Cooldown.findOne({ where: { proxyId, monitorpageId }});
    if (cooldown)
      await cooldown.update({ counter: 0, remaining: 0 });
  }
}