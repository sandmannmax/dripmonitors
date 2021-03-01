import { ResetCooldownResponse, SetCooldownResponse } from "../../proto/proxy/v1/proxy_pb";

export interface ICooldownService {
  setCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<SetCooldownResponse>;
  resetCooldown({ proxyId, monitorpageId }: { proxyId: string, monitorpageId: string }): Promise<ResetCooldownResponse>;
}