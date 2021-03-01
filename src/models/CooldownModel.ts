import { Cooldown } from '../types/Cooldown';
import { IDatabaseProvider } from '../interfaces/provider/IDatabaseProvider';
import { ICooldownModel } from '../interfaces/models/ICooldownModel';

export class CooldownModel implements ICooldownModel {
  private readonly dbProvider: IDatabaseProvider;

  constructor(dbProvider: IDatabaseProvider) {
    this.dbProvider = dbProvider;
  }

  async GetCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<Cooldown> {
    let result = await this.dbProvider.Get('lsb.proxy_cooldowns', { proxyId, monitorpageId });
    return result.Item as Cooldown;
  }

  async GetCooldowns({ monitorpageId }: { monitorpageId: string }): Promise<Array<Cooldown>> {
    let result = await this.dbProvider.Find('lsb.proxy_cooldowns', "monitorpageId = :monitorpageId", { ":monitorpageId": monitorpageId }, "monitorpageId-index");
    return result.Items as Array<Cooldown>;
  }

  async CreateCooldown({ cooldown }: { cooldown: Cooldown}): Promise<void> {
    await this.dbProvider.Insert('lsb.proxy_cooldowns', cooldown);
  }

  async HasCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<boolean> {
    return (await this.dbProvider.Get('lsb.proxy_cooldowns', { proxyId, monitorpageId })).Item != null;
  }

  async SetDownRemaining({ cooldown }: { cooldown: Cooldown }): Promise<void> {
    await this.dbProvider.Update('lsb.proxy_cooldowns', { proxyId: cooldown.proxyId , monitorpageId: cooldown.monitorpageId }, "set remaining = :remaining", { ':remaining': cooldown.remaining - 1 });
  }

  async UpdateCounter({ proxyId, monitorpageId, counter }: { proxyId: string, monitorpageId: string, counter: number }): Promise<void> {
    await this.dbProvider.Update('lsb.proxy_cooldowns', { proxyId, monitorpageId }, "set remaining = :counter, #c = :counter", { ":counter": counter }, null, { '#c': 'counter' });
  }
}