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

@Service()
export class MonitorService {
  private discordService: DiscordService;

  constructor() {
    this.discordService = Container.get(DiscordService);
  }

  async GetMonitors({ user }: { user }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};    

      let userId = user['sub'].split('|')[1];

      let monitors = await MonitorModel.GetMonitors({ userId });
      
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

      let permissions = user['permissions'].split(' ');

      console.log(permissions);

      let maxNum = 1;

      // for (let i = 0; i < roles.length; i++) {
      //   let num = MonitorModel.GetRoleMonitorCount(roles[i]);
      //   if (num > maxNum)
      //     maxNum = num;
      // }

      let userId = user['sub'].split('|')[1];
      let monitors = await MonitorModel.GetMonitors({ userId });
      
      if (maxNum <= monitors.length)
        return {success: false, error: {status: 400, message: `You already have ${maxNum} available Monitors for your account`}};    

      let id;
      do {
        id = await async({length: 24})
      } while (!await MonitorModel.IdUnused(id));
      

      let monitor = await MonitorModel.CreateMonitor({ id, userId });

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

      let monitor = await MonitorModel.GetMonitor({ id });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      if (webHook)
        await MonitorModel.UpdateWebhook({ id, webHook });

      if (botName != undefined)
        await MonitorModel.UpdateBotName({ id, botName });

      if (botImage != undefined)
        await MonitorModel.UpdateBotImage({ id, botImage });

      if (running != undefined)
        await MonitorModel.UpdateRunning({ id, running });

      monitor = await MonitorModel.GetMonitor({ id });
      
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

      let monitor = await MonitorModel.GetMonitor({ id });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};

      let monitors = await MonitorModel.GetMonitors({ userId });

      if (monitors.length == 1)
        return {success: false, error: {status: 400, message: 'Can\'t delete your last monitor'}};
      
      await MonitorModel.DeleteMonitor({ id });

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

      let monitor = await MonitorModel.GetMonitor({ id: monitorId });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsources = await MonitorsourceModel.GetMonitorsources({ monitorId });
      
      let monitorsourcesOut = [];

      for (let i = 0; i < monitorsources.length; i++) {
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

      let monitor = await MonitorModel.GetMonitor({ id: monitorId });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      if (all == undefined)
        all = false;

      let id;
      do {
        id = await async({length: 24})
      } while (!await MonitorsourceModel.IdUnused(id));

      let monitorsource = await MonitorsourceModel.CreateMonitorsource({ id, monitorId, productId, monitorpageId, all });

      let product: Product;
      let productMonitorpage;
      let monitorpage;

      if (productId) {
        product = await ProductModel.GetProduct({ id: productId });
        productMonitorpage = await MonitorpageModel.GetMonitorpageVisible({ id: product.monitorpageId });
      }

      if (monitorpageId) {
        monitorpage = await MonitorpageModel.GetMonitorpageVisible({ id: monitorpageId });
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

      let monitor = await MonitorModel.GetMonitor({ id: monitorId });

      let userId = user['sub'].split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsource = await MonitorsourceModel.GetMonitorsource({ id });

      if (!monitorsource)
        return {success: false, error: {status: 404, message: 'Monitorsource is not existing.'}};
      
      if (monitorsource.monitorId != monitorId)
        return {success: false, error: {status: 404, message: 'Monitorsource is not existing.'}};

      await MonitorsourceModel.DeleteMonitorsource({ id });

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

      let monitor = await MonitorModel.GetMonitor({ id });

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != user.id)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      if (!monitor.webHook)
        return {success: false, error: {status: 404, message: 'Monitor Webhook is not configured.'}};
        
      return this.discordService.SendTestMessage({webHook: monitor.webHook, botName: monitor.botName, botImage: monitor.botImage});
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetMonitorpages(): Promise<IResult> {
    try {
      let monitorpages = await MonitorpageModel.GetMonitorpagesVisible();

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
      let products = await ProductModel.GetProducts();

      let products_O = [];

      for (let i = 0; i < products.length; i++) {
        let monitorpage = await MonitorpageModel.GetMonitorpageVisible({ id: products[i].monitorpageId });
        products_O.push(GetProduct_O(products[i], monitorpage));
      }
        
      return {success: true, data: { products: products_O}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}