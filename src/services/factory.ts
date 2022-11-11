import { ICooldownService } from "../interfaces/services/ICooldownService";
import { IProxyService } from "../interfaces/services/IProxyService";

export class ServiceFactory {
  private static proxyService;
  private static cooldownService;
  
  public static SetProxyService = (proxyService: IProxyService) => {
    ServiceFactory.proxyService = proxyService;
  }

  public static SetCooldownService = (cooldownService: ICooldownService) => {
    ServiceFactory.cooldownService = cooldownService;
  }

  public static GetProxyService = (): IProxyService => {
    return ServiceFactory.proxyService;
  }

  public static GetCooldownService = (): ICooldownService => {
    return ServiceFactory.cooldownService;
  }
}