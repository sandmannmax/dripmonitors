import { Cooldown } from "../../types/Cooldown";

export interface ICooldownModel {
  GetCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<Cooldown>;

  GetCooldowns({ monitorpageId }: { monitorpageId: string }): Promise<Array<Cooldown>>;

  CreateCooldown({ cooldown }: { cooldown: Cooldown}): Promise<void>;

  HasCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<boolean>;

  SetDownRemaining({ cooldown }: { cooldown: Cooldown }): Promise<void>;

  UpdateCounter({ proxyId, monitorpageId, counter }: { proxyId: string, monitorpageId: string, counter: number }): Promise<void>;
}