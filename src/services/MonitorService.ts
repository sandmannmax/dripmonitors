import { Service } from 'typedi';
import Container from 'typedi';
import { MonitorModel } from '../models/MonitorModel';
import { IResult } from '../types/IResult';
import { GetMonitor_O } from '../types/Monitor';
import { DiscordService } from './DiscordService';
import { async } from 'crypto-random-string';
import { GetMonitorsource_O } from '../types/Monitorsource';
import { GetProduct_O, Product } from '../types/Product';
import { GetMonitorpage_O } from '../types/Monitorpage';
import { MonitorsourceModel } from '../models/MonitorsourceModel';
import { ProductModel } from '../models/ProductModel';
import { MonitorpageModel } from '../models/MonitorpageModel';
import { logger } from '../logger';

@Service()
export class MonitorService {
  private discordService: DiscordService;

  constructor(
    private monitorModel: MonitorModel,
    private monitorsourceModel: MonitorsourceModel,
    private monitorpageModel: MonitorpageModel,
    private productModel: ProductModel
  ){
    this.discordService = Container.get(DiscordService);
  }

  async GetMonitors({ user }: { user }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};    

      let userId = user['sub'].split('|')[1];

      let monitors = await this.monitorModel.GetMonitors({ userId });
      
      let monitorsOut = [];

      for (let i = 0; i < monitors.length; i++) {
        monitorsOut.push(GetMonitor_O(monitors[i]));
      }

      return {success: true, data: {monitors: monitorsOut}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitor({ user }: { user }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.CreateMonitor: User empty`}};    

      let permissions = user['permissions'];

      let maxNum = 1;

      // for (let i = 0; i < roles.length; i++) {
      //   let num = MonitorModel.GetRoleMonitorCount(roles[i]);
      //   if (num > maxNum)
      //     maxNum = num;
      // }

      let userId = user['sub'].split('|')[1];
      let monitors = await this.monitorModel.GetMonitors({ userId });
      
      if (maxNum <= monitors.length)
        return {success: false, error: {status: 400, message: `You already have ${maxNum} available Monitors for your account`}};    

      let id;
      do {
        id = await async({length: 24});
      } while (!await this.monitorModel.IdUnused({ id }));      

      let monitor = await this.monitorModel.CreateMonitor({ id, userId });

      return {success: true, data: {monitor: GetMonitor_O(monitor)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitor({ id, user, webHook, botName, botImage, running }: { id: string, user, webHook: string, botName: string, botImage: string, running: boolean }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.UpdateMonitor: User empty`}};    

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let monitor = await this.monitorModel.GetMonitor({ id });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      if (webHook)
        await this.monitorModel.UpdateWebhook({ id, webHook });

      if (botName != undefined)
        await this.monitorModel.UpdateBotName({ id, botName });

      if (botImage != undefined)
        await this.monitorModel.UpdateBotImage({ id, botImage });

      if (running != undefined)
        await this.monitorModel.UpdateRunning({ id, running });

      monitor = await this.monitorModel.GetMonitor({ id });
      
      return {success: true, data: {monitor: GetMonitor_O(monitor)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitor({ id, user }: { id: string, user }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.CreateMonitor: User empty`}};    

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let monitor = await this.monitorModel.GetMonitor({ id });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};

      let monitors = await this.monitorModel.GetMonitors({ userId });

      if (monitors.length == 1)
        return {success: false, error: {status: 400, message: 'Can\'t delete your last monitor'}};
      
      await this.monitorModel.DeleteMonitor({ id });

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetMonitorSources({ user, monitorId }: { user, monitorId: string }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};    

      if (!monitorId)
        return {success: false, error: {status: 400, message: '\'monitorId\' is missing'}};    

      let monitor = await this.monitorModel.GetMonitor({ id: monitorId });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsources = await this.monitorsourceModel.GetMonitorsources({ monitorId });

      let monitorsourcesOut = [];

      for (let i = 0; i < monitorsources.length; i++) {
        if (monitorsources[i].productId) {
          let product = await this.productModel.GetProduct({ id: monitorsources[i].productId });
          let productMonitorpage = await this.monitorpageModel.GetMonitorpage({ id: product.monitorpageId });
          monitorsourcesOut.push(GetMonitorsource_O(monitorsources[i], product, productMonitorpage));
        } else if (monitorsources[i].monitorpageId) {
          let monitorpage = await this.monitorpageModel.GetMonitorpage({ id: monitorsources[i].monitorpageId });
          monitorsourcesOut.push(GetMonitorsource_O(monitorsources[i], null, null, monitorpage));
        } else
          monitorsourcesOut.push(GetMonitorsource_O(monitorsources[i]));
      }

      return {success: true, data: {monitorsources: monitorsourcesOut}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitorSource({ user, monitorId, productId, monitorpageId, all }: { user, monitorId: string, productId?: string, monitorpageId?: string, all?: boolean }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};

      // TODO Role Based unterscheiden, ob Product hinzugefügt werden darf

      if (all && productId)
        return {success: false, error: {status: 400, message: '\'all\' cant be set, if productId is provided'}};    

      if (all && monitorpageId)
        return {success: false, error: {status: 400, message: '\'all\' cant be set, if \'monitorpageId\' is provided'}}; 

      if (productId && monitorpageId)
        return {success: false, error: {status: 400, message: 'Only one of \'productId\' and \'monitorpageId\' can be provided'}}; 

      if (!all && !productId && !monitorpageId)
        return {success: false, error: {status: 400, message: 'Either \'productId\' or \'monitorpageId\' must be provided or \'all\' must be set'}}; 

      if (!monitorId)
        return {success: false, error: {status: 400, message: '\'monitorId\' is missing'}};    

      let monitor = await this.monitorModel.GetMonitor({ id: monitorId });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsources = await this.monitorsourceModel.GetMonitorsources({ monitorId });

      let hasAll = false;

      for (let i = 0; i < monitorsources.length; i++) {
        if (monitorsources[i].all)
          hasAll = true;
        else if (productId && monitorsources[i].productId == productId)
          return {success: false, error: {status: 400, message: 'Monitor is already monitoring this Product'}};
        else if (monitorpageId && monitorsources[i].monitorpageId == monitorpageId)
          return {success: false, error: {status: 400, message: 'Monitor is already monitoring this Page'}};
      }

      if (hasAll)
        return {success: false, error: {status: 400, message: 'Monitor is already monitoring all Sources'}};

      if (all == undefined)
        all = false;

      let id;
      do {
        id = await async({length: 24})
      } while (!await this.monitorsourceModel.IdUnused({ id }));

      let monitorsource = await this.monitorsourceModel.CreateMonitorsource({ id, monitorId, productId, monitorpageId, all });

      let product: Product;
      let productMonitorpage;
      let monitorpage;

      if (productId) {
        product = await this.productModel.GetProduct({ id: productId });
        productMonitorpage = await this.monitorpageModel.GetMonitorpageVisible({ id: product.monitorpageId });
      }

      if (monitorpageId) {
        monitorpage = await this.monitorpageModel.GetMonitorpageVisible({ id: monitorpageId });
      }

      return {success: true, data: {monitorsource: GetMonitorsource_O(monitorsource, product, productMonitorpage, monitorpage)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitorSource({ user, id, monitorId }: { user, id: string, monitorId: string }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};   

      if (!monitorId)
        return {success: false, error: {status: 400, message: '\'monitorId\' is missing'}};    

      let monitor = await this.monitorModel.GetMonitor({ id: monitorId });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsource = await this.monitorsourceModel.GetMonitorsource({ id });

      if (!monitorsource)
        return {success: false, error: {status: 404, message: 'Monitorsource is not existing.'}};
      
      if (monitorsource.monitorId != monitorId)
        return {success: false, error: {status: 404, message: 'Monitorsource is not existing.'}};

      await this.monitorsourceModel.DeleteMonitorsource({ id });

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async SendTestMessage({ id, user }: { id: string, user }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.SendTestMessage: User empty`}};    

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};  

      let monitor = await this.monitorModel.GetMonitor({ id });

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};
      
      let userId = user['sub'].split('|')[1];

      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};

      if (!monitor.webHook)
        return {success: false, error: {status: 400, message: 'Monitor Webhook is not configured'}};

      let regex = new RegExp(/https?:\/\/\)?((canary|ptb)\.)?discord(app)?\.com\/api\/webhooks\/[0-9]+\/[A-Za-z0-9\.\-\_]+\/?$/);

      if (!regex.test(monitor.webHook))
        return {success: false, error: {status: 404, message: 'Monitor Webhook is invalid'}};
        
      return this.discordService.SendTestMessage({webHook: monitor.webHook, botName: monitor.botName, botImage: monitor.botImage});
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetMonitorpages(): Promise<IResult> {
    try {
      let monitorpages = await this.monitorpageModel.GetMonitorpagesVisible();

      let monitorpages_O = [];

      for (let i = 0; i < monitorpages.length; i++) {
        monitorpages_O.push(GetMonitorpage_O(monitorpages[i]));
      }
        
      return {success: true, data: { monitorpages: monitorpages_O}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetProducts(): Promise<IResult> {
    try {
      let products = await this.productModel.GetProducts();

      let products_O = [];

      for (let i = 0; i < products.length; i++) {
        if (products[i].monitorpageId) {
          let monitorpage = await this.monitorpageModel.GetMonitorpageVisible({ id: products[i].monitorpageId });
          if (monitorpage != null)
            products_O.push(GetProduct_O(products[i], monitorpage));
        } else
          logger.error('Product has no monitorpageId. product id: ' + products[i].id);
      }
        
      return {success: true, data: { products: products_O}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}