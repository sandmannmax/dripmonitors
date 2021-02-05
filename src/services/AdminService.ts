import { Service } from 'typedi';
import { MonitorModel } from '../models/MonitorModel';
import { IResult } from '../types/IResult';
import { GetMonitor_O } from '../types/Monitor';
import { async } from 'crypto-random-string';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';
import { MonitorpageModel } from '../models/MonitorpageModel';
import { ProxyModel } from '../models/ProxyModel';

@Service()
export class AdminService {

  async GetMonitorpages(): Promise<IResult> {
    try {
      let monitorpages = await MonitorpageModel.GetMonitorpages();
        
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
      } while (!await MonitorpageModel.IdUnused(id));      

      let monitorpage = await MonitorpageModel.CreateMonitorpage({ id, techname, name, url, visible: false });

      return {success: true, data: { monitorpage }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitorpage({ id, techname, name, visible, url }: { id: string, techname: string, name: string, visible: boolean, url: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      if (!techname)
        return {success: false, error: {status: 400, message: '\'techname\' is missing'}};
        
      if (!name)
        return {success: false, error: {status: 400, message: '\'name\' is missing'}};
        
      if (visible == undefined)
        return {success: false, error: {status: 400, message: '\'visible\' is missing'}};
      
      if (!url)
        return {success: false, error: {status: 400, message: '\'url\' is missing'}};

      let monitorpage = await MonitorpageModel.GetMonitorpage({ id });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      if (techname)
        await MonitorpageModel.UpdateTechname({ id, techname });

      if (name)
        await MonitorpageModel.UpdateName({ id, name });

      if (visible != undefined)
        await MonitorpageModel.UpdateVisible({ id, visible });

      if (url)
        await MonitorpageModel.UpdateUrl({ id, url });

      monitorpage = await MonitorpageModel.GetMonitorpage({ id });
      
      return {success: true, data: {monitorpage: monitorpage}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitorpage({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let monitorpage = await MonitorpageModel.GetMonitorpage({ id });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};
      
      await MonitorpageModel.DeleteMonitorpage({ id });

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

      // TODO

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async StopMonitorpage({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      // TODO

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetProxies(): Promise<IResult> {
    try {
      let proxies = await ProxyModel.GetProxies();
        
      return {success: true, data: { proxies }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateProxy({ address }: { address: string }): Promise<IResult> {
    try {
      if (!address)
        return {success: false, error: {status: 400, message: '\'address\' is missing'}};

      if (!await ProxyModel.IsProxyUnused({ address }))
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
      } while (!await ProxyModel.IdUnused(id));

      let json = await response.json();
        
      let proxy = await ProxyModel.CreateProxy({ id, address, cc: json.cc });

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

      if (!await ProxyModel.IsProxyUnused({ address }))
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
        
      let proxy = await ProxyModel.UpdateProxy({ id, address, cc: json.cc });

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

      let proxy = await ProxyModel.GetProxy({ id });

      if (!proxy)
        return {success: false, error: {status: 404, message: 'Proxy is not existing'}};
      
      await ProxyModel.DeleteProxy({ id });

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}