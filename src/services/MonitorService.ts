import { Service } from 'typedi';
import Container from 'typedi';
import { Monitor } from '../models/Monitor';
import { IResult } from '../types/IResult';
import { GetMonitors_O, GetMonitor_O } from '../types/Monitor';
import { DiscordService } from './DiscordService';
import { GetMonitorsources_O, GetMonitorsource_O } from '../types/Monitorsource';
import { GetProducts_O, GetProduct_O } from '../types/Product';
import { GetMonitorpages_O, GetMonitorpage_O } from '../types/Monitorpage';
import { User } from '../types/User';
import { Sequelize } from 'sequelize';
import { Monitorsource } from '../models/Monitorsource';
import { Monitorpage } from '../models/Monitorpage';
import { Product } from '../models/Product';

@Service()
export class MonitorService {
  private discordService: DiscordService;
  // private dbConnection: Sequelize;

  constructor() {
    this.discordService = Container.get(DiscordService);
    // this.dbConnection = Container.get<Sequelize>("dbConnection");
  }

  async GetMonitors({ user }: { user: User }): Promise<IResult> {
    try {      
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};   

      let userId = user.sub.split('|')[1];

      let monitors = await Monitor.findAll({ where: { userId }});

      if (!monitors || monitors.length == 0)
        return {success: true, data: { monitors: [] }};

      return {success: true, data: { monitors: GetMonitors_O(monitors) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitor({ user }: { user: User }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.CreateMonitor: User empty`}};    

      let permissions = user.permissions;

      let maxNum = 4;

      // for (let i = 0; i < roles.length; i++) {
      //   let num = MonitorModel.GetRoleMonitorCount(roles[i]);
      //   if (num > maxNum)
      //     maxNum = num;
      // }

      let userId = user.sub.split('|')[1];
      let monitors = await Monitor.findAll({ where: { userId }});
      
      if (maxNum <= monitors.length)
        return {success: false, error: {status: 400, message: `You already have ${maxNum} available Monitors for your account`}};

      let monitor = await Monitor.create({ userId });

      return {success: true, data: {monitor: GetMonitor_O(monitor)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitor({ id, user, webHook, botName, botImage, running, role }: { id: string, user: User, webHook: string, botName: string, botImage: string, running: boolean, role: string }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.UpdateMonitor: User empty`}};    

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let monitor = await Monitor.findByPk(id);

      let userId = user.sub.split('|')[1];

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (monitor.userId != userId)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      if (webHook || botName != undefined || botImage != undefined || running != undefined || role != undefined) {
        if (!webHook && monitor.webHook)
          webHook = monitor.webHook;

        if (botName == undefined && monitor.botName)
          botName = monitor.botName;

        if (botImage == undefined && monitor.botImage)
          botImage = monitor.botImage;

        if (running == undefined)
          running = monitor.running;

        monitor = await monitor.update({ webHook, botName, botImage, running });
      }

      // TODO: Role auslagern  
      
      return {success: true, data: {monitor: GetMonitor_O(monitor)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitor({ id, user }: { id: string, user: User }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.CreateMonitor: User empty`}};    

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};  

      let userId = user.sub.split('|')[1];  

      let monitor = await Monitor.findOne({ where: { id, userId }});

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};

      let dbConnection = Container.get<Sequelize>("dbConnection");
      let transaction = await dbConnection.transaction();

      if (monitor.monitorsources) {
        for (let i = 0; i < monitor.monitorsources.length; i++)
          monitor.monitorsources[i].destroy({ transaction })
      }

      if (monitor.roles) {
        for (let i = 0; i < monitor.roles.length; i++)
          monitor.roles[i].destroy({ transaction })
      }
      
      await monitor.destroy({ transaction });

      transaction.commit();

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetMonitorSources({ user, monitorId }: { user: User, monitorId: string }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};    

      if (!monitorId)
        return {success: false, error: {status: 400, message: '\'monitorId\' is missing'}};   

      let userId = user.sub.split('|')[1]; 

      let monitor = await Monitor.findOne({ where: { id: monitorId, userId }});

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsources = await Monitorsource.findAll({ where: { monitorId: monitor.id }});

      return {success: true, data: { monitorsources: await GetMonitorsources_O(monitorsources) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitorSource({ user, monitorId, productId, monitorpageId, all }: { user: User, monitorId: string, productId?: string, monitorpageId?: string, all?: boolean }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};

      // TODO: Role Based unterscheiden, ob Product hinzugefügt werden darf

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

      let userId = user['sub'].split('|')[1];  

      let monitor = await Monitor.findOne({ where: { id: monitorId, userId }});

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsources = await Monitorsource.findAll({ where: { monitorId: monitor.id }});

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

      let monitorsource = await Monitorsource.create({ monitorId, productId, monitorpageId, all });

      return {success: true, data: { monitorsource: await GetMonitorsource_O(monitorsource) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitorSource({ user, id, monitorId }: { user: User, id: string, monitorId: string }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};   

      if (!monitorId)
        return {success: false, error: {status: 400, message: '\'monitorId\' is missing'}};    

      let userId = user['sub'].split('|')[1];

      let monitor = await Monitor.findOne({ where: { id: monitorId, userId }});  

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};

      let monitorsource = await Monitorsource.findOne({ where: { id, monitorId: monitor.id }});

      if (!monitorsource)
        return {success: false, error: {status: 404, message: 'Monitorsource is not existing.'}};

      await monitorsource.destroy();

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async SendTestMessage({ id, user }: { id: string, user: User }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.SendTestMessage: User empty`}};    

      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};  

      let userId = user['sub'].split('|')[1];

      let monitor = await Monitor.findOne({ where: { id, userId }});

      if (!monitor)
        return {success: false, error: {status: 404, message: 'Monitor is not existing'}};

      if (!monitor.webHook)
        return {success: false, error: {status: 400, message: 'Monitor Webhook is not configured'}};

      let regex = new RegExp(/https?:\/\/\)?((canary|ptb)\.)?discord(app)?\.com\/api\/webhooks\/[0-9]+\/[A-Za-z0-9\.\-\_]+\/?$/);

      if (!regex.test(monitor.webHook))
        return {success: false, error: {status: 404, message: 'Monitor Webhook is invalid'}};
        
      return this.discordService.SendTestMessage({ monitor });
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetMonitorpages(): Promise<IResult> {
    try {
      let monitorpages = await Monitorpage.findAll({ where: { visible: true }});
        
      return {success: true, data: { monitorpages: GetMonitorpages_O(monitorpages) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetProducts(): Promise<IResult> {
    try {
      let products = await Product.findAll();
        
      return {success: true, data: { products: GetProducts_O(products) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}