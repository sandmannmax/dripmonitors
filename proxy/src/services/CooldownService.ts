import { ICooldownModel } from "../interfaces/models/ICooldownModel";
import { ICooldownService } from "../interfaces/services/ICooldownService";
import { SetCooldownResponse, ResetCooldownResponse } from "../proto/proxy/v1/proxy_pb";
import { Cooldown } from "../types/Cooldown";

export class CooldownService implements ICooldownService {
  private readonly cooldownModel: ICooldownModel;

  constructor(cooldownModel: ICooldownModel) {
    this.cooldownModel = cooldownModel;
  }
  
  async setCooldown({ proxyId, monitorpageId }: { proxyId: string; monitorpageId: string; }): Promise<SetCooldownResponse> {
    let cooldown = await this.cooldownModel.GetCooldown({ proxyId, monitorpageId });
    if (cooldown) {
      let counter = cooldown.counter + 1;
      await this.cooldownModel.UpdateCounter({ proxyId, monitorpageId, counter });
    } else {
      let cooldown = new Cooldown();
      cooldown.proxyId = proxyId;
      cooldown.monitorpageId = monitorpageId;
      cooldown.remaining = 1;
      cooldown.counter = 1;
      await this.cooldownModel.CreateCooldown({ cooldown });
    }
    let response = new SetCooldownResponse();
    return response;
  }

  async resetCooldown({ proxyId, monitorpageId }: { proxyId: string; monitorpageId: string; }): Promise<ResetCooldownResponse> {
    await this.cooldownModel.UpdateCounter({ proxyId, monitorpageId, counter: 0 });
    let response = new ResetCooldownResponse();
    return response;
  }
}