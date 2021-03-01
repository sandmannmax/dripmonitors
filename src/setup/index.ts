import { logger } from "../logger"
import { CooldownModel } from "../model/CooldownModel";
import { ProxyModel } from "../model/ProxyModel";
import { DatabaseProvider } from "../provider/DatabaseProvider";
import { CooldownService } from "../services/CooldownService";
import { ServiceFactory } from "../services/factory";
import { ProxyService } from "../services/ProxyService";
import serverSetup from './server';

export default () => {
  logger.debug('Setup started')

  const dbProvider = new DatabaseProvider();
  const proxyModel = new ProxyModel(dbProvider);
  const cooldownModel = new CooldownModel(dbProvider);
  const proxyService = new ProxyService(proxyModel, cooldownModel);
  const cooldownService = new CooldownService(cooldownModel);

  ServiceFactory.SetProxyService(proxyService);
  ServiceFactory.SetCooldownService(cooldownService);

  serverSetup();

  logger.debug('Setup finished')
}