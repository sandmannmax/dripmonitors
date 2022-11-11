import Container, { Service } from 'typedi';
import { Monitorpage } from '../models/Monitorpage';
import { Url } from '../models/Url';
import { ProxyService } from './ProxyService';
import { RedisClient, createClient } from 'redis';
import config from '../config';
import { logger } from '../utils/logger';
import { Monitorsource } from '../models/Monitorsource';

@Service()
export class RunService {
  private proxyService: ProxyService;
  private redisClient: RedisClient;

  constructor() {
    this.proxyService = Container.get(ProxyService);
    this.redisClient = createClient({
      host: config.redisHost,
      port: Number.parseInt(config.redisPort!),
    })
  }

  public async Run({ id }: { id: string }) {  
    try {
      let monitorpage = await Monitorpage.findByPk(id);

      if (!monitorpage) {
        logger.error('Can\'t get monitorpage.');
        return;
      }

      let urls = await Url.findAll({ where: { monitorpageId: monitorpage.id }});

      if (!urls || urls.length == 0) {
        logger.error('No Urls set for this Monitorpage');
        return;
      }
  
      const proxy = await this.proxyService.GetRandomProxy({ monitorpage });
  
      if (!proxy) {
        logger.error('No Proxy Available');
        return;
      }

      let channel = 'monitor:' + monitorpage.functionName;
      let urlsMessage = urls.map(url => url.url);

      let monitorsources = await Monitorsource.findAll({ where: { monitorpageId: monitorpage.id }});

      let monitorPromises = [];

      for (let i = 0; i < monitorsources.length; i++) {
        monitorPromises.push(monitorsources[i].getMonitor())
      }

      let monitors = await Promise.all(monitorPromises);

      let targets = [];

      for (let i = 0; i < monitors.length; i++) {
        let webHook = monitors[i].webHook;
        if (webHook) {  
          let webHookStrings = webHook.split('/');
          let id = webHookStrings[webHookStrings.length-2];
          let token = webHookStrings[webHookStrings.length-1];

          if (token.indexOf('?') != -1) {
            webHookStrings = token.split('?');
            token = webHookStrings[0];
          }

          const monitorRoles = await monitors[i].getRoles();
          const roles = monitorRoles.map(role => role.roleId);

          targets.push({ webhookId: id, webhookToken: token, name: monitors[i].botName, img: monitors[i].botImage, roles });
        }
      }
      
      this.redisClient.publish(channel, JSON.stringify({ urls: urlsMessage, proxy: proxy.address, targets }));
    }
    catch (e) {
      logger.error(`Error: ${e}`);
    }    
  }
}