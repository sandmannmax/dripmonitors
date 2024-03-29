import { Service } from 'typedi';
import { IResult } from '../types/IResult';
import { Monitorpage } from '../models/Monitorpage';
import { Queue } from 'bull';
import { QueueProvider } from '../provider/QueueProvider';
import { GetMonitorpages_OA, GetMonitorpage_OA } from '../types/Monitorpage';
import { Url } from '../models/Url';
import { GetUrls_O, GetUrl_O } from '../types/Url';
import { Proxy } from '../models/Proxy';
import { ProxyService } from './ProxyService';
import { RedisClient, createClient } from 'redis';
import config from '../config';
import { promisify } from 'util';
import pino from 'pino';
import { Monitorrun } from '../models/Monitorrun';
import { GetMonitorruns_O } from '../types/Monitorrun';
import { GetProxies_O, GetProxy_O } from '../types/Proxy';
import { Product } from '../models/Product';
import { RunService } from './RunService';
import { MonitorClientService } from './MonitorClientService';

@Service()
export class AdminService {
  private queue: Queue;
  private redis: RedisClient;
  private logger: pino.Logger;

  private redisSet: (key: string, value: string) => Promise<unknown>;
  private redisGet: (key: string) => Promise<string | null>;

  constructor(
    private proxyService: ProxyService,
    private runService: RunService,
    private monitorClientService: MonitorClientService
  ) {
    this.queue = QueueProvider.GetQueue();
    this.redis = createClient({
      host: config.redisHost,
      port: Number(config.redisPort!)
    });
    this.redisSet = promisify(this.redis.set).bind(this.redis);
    this.redisGet = promisify(this.redis.get).bind(this.redis);
    this.logger = pino();
  }

  async GetMonitorpages(): Promise<IResult> {
    try {
      let monitorpages = await Monitorpage.findAll();

      if (!monitorpages || monitorpages.length == 0)
        return {success: true, data: { monitorpages: [] }};
        
      return {success: true, data: { monitorpages: await GetMonitorpages_OA(monitorpages) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitorpage({ name, cc, functionName }: { name: string, cc: string, functionName: string }): Promise<IResult> {
    try {
      if (!name)
        return {success: false, error: {status: 400, message: '\'name\' is missing'}};
      
      if (!cc)
        return {success: false, error: {status: 400, message: '\'cc\' is missing'}};    
      
      if (!functionName)
        return {success: false, error: {status: 400, message: '\'functionName\' is missing'}}; 

      let monitorpage = await Monitorpage.create({ name, cc, functionName });
      
      return {success: true, data: { monitorpage: await GetMonitorpage_OA(monitorpage) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitorpage({ id, functionName, name, visible, cc, isHtml, func }: { id: string, functionName: string, name: string, visible: boolean, cc: string, isHtml: boolean, func: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let monitorpage = await Monitorpage.findOne({ where: { id } });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      if (functionName || name || visible != undefined || cc || isHtml != undefined) {
        if (!functionName)
          functionName = monitorpage.functionName;

        if (!name)
          name = monitorpage.name;

        if (visible == undefined)
          visible = monitorpage.visible;

        if (!cc)
          cc = monitorpage.cc;

        if (isHtml == undefined)
          isHtml = monitorpage.isHtml;

        monitorpage = await monitorpage.update({ functionName, name, visible, cc, isHtml });
      }
      
      return {success: true, data: { monitorpage: await GetMonitorpage_OA(monitorpage) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitorpage({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let monitorpage = await Monitorpage.findOne({ where: { id } });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};
      
      await monitorpage.destroy();

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetUrls({ monitorpageId }: { monitorpageId: string }): Promise<IResult> {
    try {
      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};    

      let urls = await Url.findAll({ where: { monitorpageId }});

      if (!urls)
        return { success: true, data: { urls: [] }};

      return {success: true, data: { urls: GetUrls_O(urls) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateUrl({ monitorpageId, url }: { monitorpageId: string, url: string }): Promise<IResult> {
    try {
      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};   
        
      if (!url)
        return {success: false, error: {status: 400, message: '\'url\' is missing'}}; 

      let monitorpage = await Monitorpage.findOne({ where: { id: monitorpageId }});

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};        

      let urlelement = await monitorpage.createUrl({ url, monitorpageId });

      return {success: true, data: { url: GetUrl_O(urlelement) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateUrl({ id, monitorpageId, url }: { id: string, monitorpageId: string, url: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let urlelement = await Url.findOne({ where: { id, monitorpageId }});

      if (!urlelement)
        return {success: false, error: {status: 404, message: 'Url is not existing'}};

      if (url)
        urlelement = await urlelement.update({ url });
      
      return { success: true, data: { url: GetUrl_O(urlelement) } };
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteUrl({ id, monitorpageId }: { id: string, monitorpageId: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let urlelement = await Url.findOne({ where: { id, monitorpageId }});

      if (!urlelement)
        return {success: false, error: {status: 404, message: 'Url is not existing'}};
      
      await urlelement.destroy();

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async StartMonitorpage({ id, interval }: { id: string, interval: number }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};
        
      if (!interval)
        return {success: false, error: {status: 400, message: '\'interval\' is missing'}};  

      let monitorpage = await Monitorpage.findByPk(id);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      let jobs = await this.queue.getRepeatableJobs();

      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == id)
          await this.queue.removeRepeatableByKey(jobs[i].key);
      }

      await this.queue.add('monitor', { id }, { repeat: { every: interval * 1000 }, jobId: id });

      await monitorpage.update({ running: true, interval });

      return {success: true, data: { interval }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async StopMonitorpage({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(id);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      let jobs = await this.queue.getRepeatableJobs();

      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == id)
          await this.queue.removeRepeatableByKey(jobs[i].key);
      }

      await monitorpage.update({ running: false, interval: 0 });

      return {success: true, data: { interval: 0 }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetProxies(): Promise<IResult> {
    try {
      let proxies = await Proxy.findAll();
        
      return {success: true, data: { proxies: await GetProxies_O(proxies) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateProxy({ address, cc }: { address: string, cc: string }): Promise<IResult> {
    try {
      if (!address)
        return {success: false, error: {status: 400, message: '\'address\' is missing'}};

      if (!cc)
        return {success: false, error: {status: 400, message: '\'cc\' is missing'}};

      if ((await Proxy.findAll({ where: { address }})).length != 0)
        return {success: false, error: {status: 404, message: 'Proxy is already registered'}};
        
      let proxy = await Proxy.create({ address, cc });

      return {success: true, data: { proxy: await GetProxy_O(proxy) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateProxy({ id, address, cc }: { id: string, address: string, cc: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};  
        
      let proxy = await Proxy.findByPk(id);

      if (!proxy)
        return {success: false, error: {status: 404, message: 'Proxy is not existing'}};

      if (!address)
        return {success: false, error: {status: 400, message: '\'address\' is missing'}};

      if (!cc)
        return {success: false, error: {status: 400, message: '\'cc\' is missing'}};

      if ((await Proxy.findAll({ where: { address }})).length != 0)
        return {success: false, error: {status: 404, message: 'Proxy is already registered'}};
        
      proxy = await proxy.update({ address, cc });

      return {success: true, data: { proxy: await GetProxy_O(proxy) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteProxy({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let proxy = await Proxy.findByPk(id);

      if (!proxy)
        return {success: false, error: {status: 404, message: 'Proxy is not existing'}};
      
      await proxy.destroy();

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetMonitorruns(): Promise<IResult> {
    try {
      let monitorruns = await Monitorrun.findAll({ order: [ ['timestampStart', 'DESC'] ]});
        
      return {success: true, data: { monitorruns: GetMonitorruns_O(monitorruns) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetProducts({ monitorpageId }: { monitorpageId: string }): Promise<IResult> {
    try {
      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(monitorpageId);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      monitorpageId = monitorpage.functionName;

      let products = await this.monitorClientService.GetProducts({ monitorpageId });

      let productsOut = [];

      for (let i = 0; i < products.length; i++) {
        let productOut: { id: string, name: string, href: string, img: string, monitored: boolean } = { id: '', name: '', href: '', img: '', monitored: false };
        productOut.id = products[i].getId();
        productOut.name = products[i].getName();
        productOut.href = products[i].getHref();
        productOut.img = products[i].getImg();
        productOut.monitored = products[i].getMonitored();
        productsOut.push(productOut);
      }
        
      return {success: true, data: { products: productsOut }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async ActivateProductMonitoring({ id, monitorpageId }: { id: string, monitorpageId: string }): Promise<IResult> {
    try {
      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(monitorpageId);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      monitorpageId = monitorpage.functionName;

      await this.monitorClientService.ActivateProductMonitoring({ id, monitorpageId });
        
      return { success: true };
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DisableProductMonitoring({ id, monitorpageId }: { id: string, monitorpageId: string }): Promise<IResult> {
    try {
      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(monitorpageId);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      monitorpageId = monitorpage.functionName;

      await this.monitorClientService.DisableProductMonitoring({ id, monitorpageId });
        
      return { success: true };
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetFilters({ monitorpageId }: { monitorpageId: string }): Promise<IResult> {
    try {
      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(monitorpageId);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      monitorpageId = monitorpage.functionName;

      let filters = await this.monitorClientService.GetFilters({ monitorpageId });

      let filtersOut = [];

      for (let i = 0; i < filters.length; i++) {
        let filterOut: { id: string, value: string } = { id: '', value: '' };
        filterOut.id = filters[i].getId();
        filterOut.value = filters[i].getValue();
        filtersOut.push(filterOut);
      }
        
      return {success: true, data: { filters: filtersOut }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async AddFilter({ value, monitorpageId }: { value: string, monitorpageId: string }): Promise<IResult> {
    try {
      if (!value)
        return {success: false, error: {status: 400, message: '\'value\' is missing'}};

      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(monitorpageId);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      monitorpageId = monitorpage.functionName;

      let filter = await this.monitorClientService.AddFilter({ value, monitorpageId });

      let filterOut: { id: string, value: string } = { id: '', value: '' };
      filterOut.id = filter.getId();
      filterOut.value = filter.getValue();
        
      return {success: true, data: { filter: filterOut }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async RemoveFilter({ id, monitorpageId }: { id: string, monitorpageId: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      if (!monitorpageId)
        return {success: false, error: {status: 400, message: '\'monitorpageId\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(monitorpageId);

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      monitorpageId = monitorpage.functionName;

      await this.monitorClientService.RemoveFilter({ id, monitorpageId });
        
      return { success: true };
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}