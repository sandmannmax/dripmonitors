import { Service, Container, Inject } from 'typedi';
import { IResult } from '../types/IResult';
import { async } from 'crypto-random-string';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';
import { MonitorpageModel } from '../models/MonitorpageModel';
import { ProxyModel } from '../models/ProxyModel';
import { Queue } from 'bull';
import { QueueProvider } from '../provider/QueueProvider';

@Service()
export class AdminService {
  private queue: Queue;

  constructor(
    private monitorpageModel: MonitorpageModel,
    private proxyModel: ProxyModel
  ) {
    this.queue = QueueProvider.GetQueue();
  }

  async GetMonitorpages(): Promise<IResult> {
    try {
      let monitorpages = await this.monitorpageModel.GetMonitorpages();
        
      return {success: true, data: { monitorpages }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitorpage({ techname, name, url }: { techname: string, name: string, url: string }): Promise<IResult> {
    try {
      if (!techname)
        return {success: false, error: {status: 400, message: '\'techname\' is missing'}};        
        
      if (!name)
        return {success: false, error: {status: 400, message: '\'name\' is missing'}};
      
      if (!url)
        return {success: false, error: {status: 400, message: '\'url\' is missing'}};

      let id;
      do {
        id = await async({length: 24})
      } while (!await this.monitorpageModel.IdUnused({ id }));      

      let monitorpage = await this.monitorpageModel.CreateMonitorpage({ id, techname, name, url, visible: false });

      return {success: true, data: { monitorpage }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitorpage({ id, techname, name, visible, url }: { id: string, techname: string, name: string, visible: boolean, url: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let monitorpage = await this.monitorpageModel.GetMonitorpage({ id });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      if (techname)
        await this.monitorpageModel.UpdateTechname({ id, techname });

      if (name)
        await this.monitorpageModel.UpdateName({ id, name });

      if (visible != undefined)
        await this.monitorpageModel.UpdateVisible({ id, visible });

      if (url)
        await this.monitorpageModel.UpdateUrl({ id, url });

      monitorpage = await this.monitorpageModel.GetMonitorpage({ id });
      
      return {success: true, data: {monitorpage: monitorpage}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitorpage({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let monitorpage = await this.monitorpageModel.GetMonitorpage({ id });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};
      
      await this.monitorpageModel.DeleteMonitorpage({ id });

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

      let monitorpage = await this.monitorpageModel.GetMonitorpage({ id });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      let jobs = await this.queue.getRepeatableJobs();

      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == id)
          await this.queue.removeRepeatableByKey(jobs[i].key);
      }

      await this.queue.add('monitor', { id: id, techname: monitorpage.techname, name: monitorpage.name }, { repeat: { every: interval * 1000 }, jobId: id });

      await this.monitorpageModel.UpdateRunning({ id, running: true, interval });

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async StopMonitorpage({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let jobs = await this.queue.getRepeatableJobs();

      for (let i = 0; i < jobs.length; i++) {
        if (jobs[i].id == id)
          await this.queue.removeRepeatableByKey(jobs[i].key);
      }

      await this.monitorpageModel.UpdateRunning({ id, running: false, interval: 0 });

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetProxies(): Promise<IResult> {
    try {
      let proxies = await this.proxyModel.GetProxies();
        
      return {success: true, data: { proxies }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateProxy({ address }: { address: string }): Promise<IResult> {
    try {
      if (!address)
        return {success: false, error: {status: 400, message: '\'address\' is missing'}};

      if (!await this.proxyModel.IsProxyUnused({ address }))
        return {success: false, error: {status: 404, message: 'Proxy is already registered'}};

      let response;
      try {
        let url = 'https://api.myip.com'
        response = await fetch(url, {
          method: 'GET',
          agent: new HttpsProxyAgent(address),
        });
      } catch (error) {
        logger.warn("Error in Proxy Testing: " + error);
        return {success: false, error: {status: 404, message: 'Bad Proxy'}};
      }

      if (response.status != 200)
        return {success: false, error: {status: 404, message: 'Bad Proxy'}};

      let id;
      do {
        id = await async({length: 24})
      } while (!await this.proxyModel.IdUnused({ id }));

      let json = await response.json();
        
      let proxy = await this.proxyModel.CreateProxy({ id, address, cc: json.cc });

      return {success: true, data: { proxy }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateProxy({ id, address }: { id: string, address: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      if (!address)
        return {success: false, error: {status: 400, message: '\'address\' is missing'}};

      if (!await this.proxyModel.IsProxyUnused({ address }))
        return {success: false, error: {status: 404, message: 'Proxy is already registered'}};

      let response;
      try {
        let url = 'https://api.myip.com'
        response = await fetch(url, {
          method: 'GET',
          agent: new HttpsProxyAgent(address),
        });
      } catch (error) {
        logger.warn("Error in Proxy Testing: " + error);
        return {success: false, error: {status: 404, message: 'Bad Proxy'}};
      }

      if (response.status != 200)
        return {success: false, error: {status: 404, message: 'Bad Proxy'}};

      let json = await response.json();
        
      let proxy = await this.proxyModel.UpdateProxy({ id, address, cc: json.cc });

      // TODO vlt Einschränkungen löschen, wenn Adresse geändert wurde

      return {success: true, data: { proxy }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteProxy({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let proxy = await this.proxyModel.GetProxy({ id });

      if (!proxy)
        return {success: false, error: {status: 404, message: 'Proxy is not existing'}};
      
      await this.proxyModel.DeleteProxy({ id });

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}