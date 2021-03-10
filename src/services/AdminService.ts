import { Service, Container, Inject } from 'typedi';
import { IResult } from '../types/IResult';
import { async } from 'crypto-random-string';
import { logger } from '../logger';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';
import { Monitorpage } from '../models/Monitorpage';
import { Queue } from 'bull';
import { QueueProvider } from '../provider/QueueProvider';
import { GetProcessconfig_O } from '../types/Processconfig';
import { GetMonitorpageconfigs_O, GetMonitorpageconfig_O, Monitorpageconfig_O } from '../types/Monitorpageconfig';
import { GetPipeelements_O, GetPipeelement_O } from '../types/Pipeelement';
import { ScraperClientService } from './ScraperClientService';
import { GetMonitorpages_OA, GetMonitorpage_OA, Monitorpage_OA } from '../types/Monitorpage';
import { Url } from '../models/Url';
import { GetUrls_O, GetUrl_O } from '../types/Url';
import { Proxy } from '../models/Proxy';
import { Op } from 'sequelize';
import { Monitorpageconfig } from '../models/Monitorpageconfig';
import { Processconfig } from '../models/Processconfig';
import { Pipeelement } from '../models/Pipeelement';
import { String } from 'aws-sdk/clients/acm';
import { ProxyService } from './ProxyService';

@Service()
export class AdminService {
  private queue: Queue;

  constructor(
    private proxyService: ProxyService
  ) {
    this.queue = QueueProvider.GetQueue();
  }

  async GetMonitorpages(): Promise<IResult> {
    try {
      let monitorpages = await Monitorpage.findAll();

      if (!monitorpages || monitorpages.length == 0)
        return {success: true, data: { monitorpages: [] }};
        
      return {success: true, data: { monitorpages: GetMonitorpages_OA(monitorpages) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitorpage({ techname, name, cc }: { techname: string, name: string, cc: string }): Promise<IResult> {
    try {
      if (!techname)
        return {success: false, error: {status: 400, message: '\'techname\' is missing'}};        
        
      if (!name)
        return {success: false, error: {status: 400, message: '\'name\' is missing'}};
      
      if (!cc)
        return {success: false, error: {status: 400, message: '\'cc\' is missing'}};    

      let monitorpage = await Monitorpage.create({ techname, name, cc });
      
      return {success: true, data: { monitorpage: GetMonitorpage_OA(monitorpage) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitorpage({ id, techname, name, visible, cc, monitorpageconfigId }: { id: string, techname: string, name: string, visible: boolean, cc: string, monitorpageconfigId: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let monitorpage = await Monitorpage.findOne({ where: { id } });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      if (techname || name || visible != undefined || cc || monitorpageconfigId) {
        if (!techname)
          techname = monitorpage.techname;

        if (!name)
          name = monitorpage.name;

        if (visible == undefined)
          visible = monitorpage.visible;

        if (!cc)
          cc = monitorpage.cc;

        if (!monitorpageconfigId && monitorpage.monitorpageconfigId)
          monitorpageconfigId = monitorpage.monitorpageconfigId;

        monitorpage = await monitorpage.update({ techname, name, visible, cc, monitorpageconfigId });
      }
      
      return {success: true, data: { monitorpage: GetMonitorpage_OA(monitorpage) }};
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

      await this.queue.add('monitor', { id: id, techname: monitorpage.techname, name: monitorpage.name }, { repeat: { every: interval * 1000 }, jobId: id });

      await monitorpage.update({ running: true, interval });

      return {success: true};
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

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async TestMonitorpage({ id, reloadContent }: { id: string, reloadContent: boolean }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      if (reloadContent == undefined)
        return {success: false, error: {status: 400, message: '\'reloadContent\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(id);

      if (!monitorpage)
        return {success: false, error: {status: 400, message: 'monitorpage is not existing'}};
      
      if (!monitorpage.monitorpageconfig)
        return {success: false, error: {status: 400, message: 'monitorpage has no config'}};

      let urls = await Url.findAll({ where: { monitorpageId: monitorpage.id }});

      if (!urls || urls.length == 0)
        return {success: false, error: {status: 400, message: 'monitorpage has no urls'}};

      let proxy = await this.proxyService.GetRandomProxy({ monitorpage });
      let address = '';

      let error: string | null = null;
      let warn: string | null = null;

      if (proxy && proxy.address)
        address = proxy.address;
      else {
        logger.warn('No Proxy available for TestMonitorpage');
        warn = 'No Proxy available for TestMonitorpage';
      }

      // TODO: IMPLEMENTIEREN
      let result = { success: true, error: undefined, data: {}}
      // let result = await this.scraperClientService.Test({ monitorpageId: id, url: urls[0].url, proxy: address, monitorpageconfig: monitorpageconfig_O, reloadContent });
      
      if (!result.success) {
        logger.error('TestMonitorpage Error: ' + JSON.stringify(result.error));
        return { success: false, error: result.error }
      }

      return {success: true, data: { products: result.data, error, warn }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async GetMonitorpageconfigs(): Promise<IResult> {
    try {
      let monitorpageconfigs = await Monitorpageconfig.findAll();
        
      return {success: true, data: { monitorpageconfigs: GetMonitorpageconfigs_O(monitorpageconfigs) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateMonitorpageconfig(): Promise<IResult> {
    try {
      let monitorpageconfigId;
      do {
        monitorpageconfigId = await async({length: 24})
      } while (!await this.monitorpageconfigModel.IdUnused({ id: monitorpageconfigId }));

      let id;
      let processconfigs = new Array<Processconfig>();

      for (let i = 0; i < 12; i++) {
        do {
          id = await async({length: 24})
        } while (!await this.processconfigModel.IdUnused({ id }));

        processconfigs.push(await this.processconfigModel.InsertProcessconfig({ id, monitorpageconfigId: monitorpageconfigId, constant: false, hasConstant: false }));
      }
        
      let monitorpageconfig = await this.monitorpageconfigModel.InsertMonitorpageconfig({ id: monitorpageconfigId, isHtml: false, allSizesAvailable: false, hasChildProducts: false, hasParentProducts: false, soldOutCheckSizes: false, productsConfigId: processconfigs[0].id, idConfigId: processconfigs[1].id, nameConfigId: processconfigs[2].id, hrefConfigId: processconfigs[3].id, imgConfigId: processconfigs[4].id, priceConfigId: processconfigs[5].id, activeConfigId: processconfigs[6].id, soldOutConfigId: processconfigs[7].id, hasSizesConfigId: processconfigs[8].id, sizesConfigId: processconfigs[9].id, sizesSoldOutConfigId: processconfigs[10].id, childProductConfigId: processconfigs[11].id });

      // let monitorpageconfig_O = GetMonitorpageconfig_O(monitorpageconfig, GetProcessconfig_O(processconfigs[0], []), GetProcessconfig_O(processconfigs[1], []), GetProcessconfig_O(processconfigs[2], []), GetProcessconfig_O(processconfigs[3], []), GetProcessconfig_O(processconfigs[4], []), GetProcessconfig_O(processconfigs[5], []), GetProcessconfig_O(processconfigs[6], []), GetProcessconfig_O(processconfigs[7], []), GetProcessconfig_O(processconfigs[8], []), GetProcessconfig_O(processconfigs[9], []), GetProcessconfig_O(processconfigs[10], []), GetProcessconfig_O(processconfigs[11], []));

      return {success: true, data: { monitorpageconfig }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitorpageconfig({ id, isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts }: { id: string, isHtml: boolean, allSizesAvailable: boolean, soldOutCheckSizes: boolean, hasParentProducts: boolean, hasChildProducts: boolean }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let monitorpageconfig = await Monitorpageconfig.findByPk(id);

      if (!monitorpageconfig)
        return {success: false, error: {status: 404, message: 'Monitorpageconfig is not existing'}};

      if (isHtml != undefined || allSizesAvailable != undefined || soldOutCheckSizes != undefined || hasParentProducts != undefined || hasChildProducts != undefined) {
        if (isHtml == undefined)
          isHtml = monitorpageconfig.isHtml;

        if (allSizesAvailable == undefined)
          allSizesAvailable = monitorpageconfig.allSizesAvailable;

        if (soldOutCheckSizes == undefined)
          soldOutCheckSizes = monitorpageconfig.soldOutCheckSizes;

        if (hasParentProducts == undefined)
          hasParentProducts = monitorpageconfig.hasParentProducts;

        if (hasChildProducts == undefined)
          hasChildProducts = monitorpageconfig.hasChildProducts;

        monitorpageconfig = await monitorpageconfig.update({ isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts});
      }
      
      return { success: true, data: { monitorpageconfig: GetMonitorpageconfig_O(monitorpageconfig) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeleteMonitorpageconfig({ id }: { id: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let monitorpageconfig = await Monitorpageconfig.findByPk(id);

      if (!monitorpageconfig)
        return {success: false, error: {status: 404, message: 'Monitorpageconfig is not existing'}};

      await monitorpageconfig.destroy();

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateProcessconfig({ id, monitorpageconfigId, constant, hasConstant }: { id: string, monitorpageconfigId: string, constant: boolean, hasConstant: boolean }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let processconfig = await Processconfig.findOne({ where: { id, monitorpageconfigId }});

      if (!processconfig)
        return {success: false, error: {status: 404, message: 'Processconfig is not existing'}};

      if (constant != undefined || hasConstant != undefined) {
        if (constant == undefined)
          constant = processconfig.constant;

        if (hasConstant == undefined)
          hasConstant = processconfig.hasConstant;

        processconfig = await processconfig.update({ constant, hasConstant });
      }
      
      return { success: true, data: { processconfig: GetProcessconfig_O(processconfig) } };
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreatePipeelement({ monitorpageconfigId, processconfigId}: { monitorpageconfigId: string, processconfigId: string }): Promise<IResult> {
    try {
      let processconfig = await Processconfig.findByPk(processconfigId);

      if (!processconfig || processconfig.monitorpageconfigId != monitorpageconfigId)
        return {success: false, error: {status: 404, message: 'Processconfig is not existing'}};

      let biggest = 0;
      if (processconfig.pipeelements) {
        for (let i = 0; i < processconfig.pipeelements.length; i++) {
          if (processconfig.pipeelements[i].order > biggest)
            biggest = processconfig.pipeelements[i].order;
        }
      }

      let pipeelement = await Pipeelement.create({ processconfigId, command: "", order: biggest+1 });

      return {success: true, data: { pipeelement: GetPipeelement_O(pipeelement) }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdatePipeelement({ id, monitorpageconfigId, processconfigId, command, order }:  { id: string, monitorpageconfigId: string, processconfigId: string, command: string, order: number }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let processconfig = await Processconfig.findByPk(processconfigId);

      if (!processconfig || processconfig.monitorpageconfigId != monitorpageconfigId)
        return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

      let pipeelement = await Pipeelement.findByPk(id);

      if (!pipeelement || pipeelement.processconfigId != processconfigId)
        return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

      if (command || order) {
        if (!command)
          command = pipeelement.command;

        if (!order)
          order = pipeelement.order;

        pipeelement = await pipeelement.update({ command, order });
      }
      
      return { success: true, data: { pipeelement: GetPipeelement_O(pipeelement) } };
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async DeletePipeelement({ id, monitorpageconfigId, processconfigId }: { id: string, monitorpageconfigId: string, processconfigId: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

      let processconfig = await Processconfig.findByPk(processconfigId);

      if (!processconfig || processconfig.monitorpageconfigId != monitorpageconfigId)
        return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

      let pipeelement = await Pipeelement.findByPk(id);

      if (!pipeelement || pipeelement.processconfigId != processconfigId)
        return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

      await pipeelement.destroy();

      return {success: true};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }  

  async GetProxies(): Promise<IResult> {
    try {
      let proxies = await Proxy.findAll();
        
      return {success: true, data: { proxies }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateProxy({ address }: { address: string }): Promise<IResult> {
    try {
      if (!address)
        return {success: false, error: {status: 400, message: '\'address\' is missing'}};

      if ((await Proxy.findAll({ where: { address }})).length != 0)
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
        
      let proxy = await Proxy.create({ address, cc: json.cc });

      return {success: true, data: { proxy }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateProxy({ id, address }: { id: string, address: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};  
        
      let proxy = await Proxy.findByPk(id);

      if (!proxy)
        return {success: false, error: {status: 404, message: 'Proxy is not existing'}};

      if (!address)
        return {success: false, error: {status: 400, message: '\'address\' is missing'}};

      if ((await Proxy.findAll({ where: { address }})).length != 0)
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
        
      proxy = await proxy.update({ address, cc: json.cc });

      // TODO: vlt Einschränkungen löschen, wenn Adresse geändert wurde

      return {success: true, data: { proxy }};
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
}