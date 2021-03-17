import { Service, Container, Inject } from 'typedi';
import { IResult } from '../types/IResult';
import { HttpsProxyAgent } from 'https-proxy-agent';
import fetch from 'node-fetch';
import { Monitorpage } from '../models/Monitorpage';
import { Queue } from 'bull';
import { QueueProvider } from '../provider/QueueProvider';
import { ScraperClientService } from './ScraperClientService';
import { GetMonitorpages_OA, GetMonitorpage_OA } from '../types/Monitorpage';
import { Url } from '../models/Url';
import { GetUrls_O, GetUrl_O } from '../types/Url';
import { Proxy } from '../models/Proxy';
import { ProxyService } from './ProxyService';
import safeEval from 'notevil';
import { RedisClient, createClient } from 'redis';
import config from '../config';
import { promisify } from 'util';
import { BucketService } from './BucketService';
import pino from 'pino';
import { Monitorrun } from '../models/Monitorrun';
import { GetMonitorruns_O } from '../types/Monitorrun';
import { GetProxies_O, GetProxy_O } from '../types/Proxy';

@Service()
export class AdminService {
  private queue: Queue;
  private redis: RedisClient;
  private logger: pino.Logger;

  private redisSet: (key: string, value: string) => Promise<unknown>;
  private redisGet: (key: string) => Promise<string | null>;

  constructor(
    private proxyService: ProxyService,
    private scraperClientService: ScraperClientService,
    private bucketService: BucketService
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

      let funcs: string[] = [];

      for (let i = 0; i < monitorpages.length; i++) {
        let func = ''
        try {
          func = await this.bucketService.Download({ fileName: monitorpages[i].id + 'script.js'});
        } catch {}
        funcs.push(func);
      }
        
      return {success: true, data: { monitorpages: await GetMonitorpages_OA(monitorpages, funcs) }};
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
      
      return {success: true, data: { monitorpage: await GetMonitorpage_OA(monitorpage, '') }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitorpage({ id, techname, name, visible, cc, isHtml, func }: { id: string, techname: string, name: string, visible: boolean, cc: string, isHtml: boolean, func: string }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      let monitorpage = await Monitorpage.findOne({ where: { id } });

      if (!monitorpage)
        return {success: false, error: {status: 404, message: 'Monitorpage is not existing'}};

      if (techname || name || visible != undefined || cc || isHtml != undefined) {
        if (!techname)
          techname = monitorpage.techname;

        if (!name)
          name = monitorpage.name;

        if (visible == undefined)
          visible = monitorpage.visible;

        if (!cc)
          cc = monitorpage.cc;

        if (isHtml == undefined)
          isHtml = monitorpage.isHtml;

        monitorpage = await monitorpage.update({ techname, name, visible, cc, isHtml });
      }

      if (func)
        await this.bucketService.Upload({ fileName: id + 'script.js', content: func });
      else {
        func = ''
        try {
          func = await this.bucketService.Download({ fileName: id + 'script.js'});
        } catch {}
      }
      
      return {success: true, data: { monitorpage: await GetMonitorpage_OA(monitorpage, func) }};
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

  async TestMonitorpage({ id, func, reloadContent }: { id: string, func: string, reloadContent: boolean }): Promise<IResult> {
    try {
      if (!id)
        return {success: false, error: {status: 400, message: '\'id\' is missing'}};

      if (reloadContent == undefined)
        return {success: false, error: {status: 400, message: '\'reloadContent\' is missing'}};

      if (!func)
        return {success: false, error: {status: 400, message: '\'func\' is missing'}};

      let monitorpage = await Monitorpage.findByPk(id);

      if (!monitorpage)
        return {success: false, error: {status: 400, message: 'monitorpage is not existing'}};

      let urls = await Url.findAll({ where: { monitorpageId: monitorpage.id }});

      if (!urls || urls.length == 0)
        return {success: false, error: {status: 400, message: 'monitorpage has no urls'}};

      let successOut = false;
      let resultOut = null;
      let canParseToProduct = false;
      let errorOut: string | null = null;
      let warnOut: string | null = null;
      let logsOut: string = '';

      let content;

      if (!reloadContent)
        content = await this.redisGet(id + '-content');

      if (reloadContent || !content) {
        let proxy = await this.proxyService.GetRandomProxy({ monitorpage });
        let address = '';

        if (proxy && proxy.address)
          address = proxy.address;
        else {
          this.logger.warn('No Proxy available for TestMonitorpage');
          warnOut = 'No Proxy available for TestMonitorpage';
        }

        content = await this.scraperClientService.Get({ url: urls[0].url, proxy: address, isHtml: monitorpage.isHtml });
        this.redisSet(id + '-content', content);
      }

      try {
        let f = safeEval.Function('content', 'log', 'json', 'Date', func);
        resultOut = f(content, (text: string) => {
          logsOut += text + '\n';
        }, JSON.parse, Date);
        successOut = true;
      } catch (error) {
        errorOut = error;
      }

      if (successOut && resultOut instanceof Array && resultOut.length > 0) {
        canParseToProduct = true;

        if (!('id' in resultOut[0]))
          canParseToProduct = false;
        else if (!('name' in resultOut[0]))
          canParseToProduct = false;
        else if (!('href' in resultOut[0]))
          canParseToProduct = false;
        else if (!('img' in resultOut[0]))
          canParseToProduct = false;
        else if (!('price' in resultOut[0]))
          canParseToProduct = false;
        else if (!('active' in resultOut[0]))
          canParseToProduct = false;
        else if (!('soldOut' in resultOut[0]))
          canParseToProduct = false;
        else if (!('hasSizes' in resultOut[0]))
          canParseToProduct = false;
        else if (!('sizes' in resultOut[0]))
          canParseToProduct = false;
        else if (!(resultOut[0].sizes instanceof Array))
          canParseToProduct = false;
      }

      return { success: true, data: { success: successOut, result: resultOut, error: errorOut, warn: warnOut, logs: logsOut, canParseToProduct }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  // async GetMonitorpageconfigs(): Promise<IResult> {
  //   try {
  //     let monitorpageconfigs = await Monitorpageconfig.findAll();
        
  //     return {success: true, data: { monitorpageconfigs: GetMonitorpageconfigs_O(monitorpageconfigs) }};
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }

  // async CreateMonitorpageconfig(): Promise<IResult> {
  //   try {
  //     // let monitorpageconfigId;
  //     // do {
  //     //   monitorpageconfigId = await async({length: 24})
  //     // } while (!await this.monitorpageconfigModel.IdUnused({ id: monitorpageconfigId }));

  //     // let id;
  //     // let processconfigs = new Array<Processconfig>();

  //     // for (let i = 0; i < 12; i++) {
  //     //   do {
  //     //     id = await async({length: 24})
  //     //   } while (!await this.processconfigModel.IdUnused({ id }));

  //     //   processconfigs.push(await this.processconfigModel.InsertProcessconfig({ id, monitorpageconfigId: monitorpageconfigId, constant: false, hasConstant: false }));
  //     // }
        
  //     // let monitorpageconfig = await this.monitorpageconfigModel.InsertMonitorpageconfig({ id: monitorpageconfigId, isHtml: false, allSizesAvailable: false, hasChildProducts: false, hasParentProducts: false, soldOutCheckSizes: false, productsConfigId: processconfigs[0].id, idConfigId: processconfigs[1].id, nameConfigId: processconfigs[2].id, hrefConfigId: processconfigs[3].id, imgConfigId: processconfigs[4].id, priceConfigId: processconfigs[5].id, activeConfigId: processconfigs[6].id, soldOutConfigId: processconfigs[7].id, hasSizesConfigId: processconfigs[8].id, sizesConfigId: processconfigs[9].id, sizesSoldOutConfigId: processconfigs[10].id, childProductConfigId: processconfigs[11].id });

  //     // let monitorpageconfig_O = GetMonitorpageconfig_O(monitorpageconfig, GetProcessconfig_O(processconfigs[0], []), GetProcessconfig_O(processconfigs[1], []), GetProcessconfig_O(processconfigs[2], []), GetProcessconfig_O(processconfigs[3], []), GetProcessconfig_O(processconfigs[4], []), GetProcessconfig_O(processconfigs[5], []), GetProcessconfig_O(processconfigs[6], []), GetProcessconfig_O(processconfigs[7], []), GetProcessconfig_O(processconfigs[8], []), GetProcessconfig_O(processconfigs[9], []), GetProcessconfig_O(processconfigs[10], []), GetProcessconfig_O(processconfigs[11], []));

  //     return {success: true, data: { }};
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }

  // async UpdateMonitorpageconfig({ id, isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts }: { id: string, isHtml: boolean, allSizesAvailable: boolean, soldOutCheckSizes: boolean, hasParentProducts: boolean, hasChildProducts: boolean }): Promise<IResult> {
  //   try {
  //     if (!id)
  //       return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

  //     let monitorpageconfig = await Monitorpageconfig.findByPk(id);

  //     if (!monitorpageconfig)
  //       return {success: false, error: {status: 404, message: 'Monitorpageconfig is not existing'}};

  //     if (isHtml != undefined || allSizesAvailable != undefined || soldOutCheckSizes != undefined || hasParentProducts != undefined || hasChildProducts != undefined) {
  //       if (isHtml == undefined)
  //         isHtml = monitorpageconfig.isHtml;

  //       if (allSizesAvailable == undefined)
  //         allSizesAvailable = monitorpageconfig.allSizesAvailable;

  //       if (soldOutCheckSizes == undefined)
  //         soldOutCheckSizes = monitorpageconfig.soldOutCheckSizes;

  //       if (hasParentProducts == undefined)
  //         hasParentProducts = monitorpageconfig.hasParentProducts;

  //       if (hasChildProducts == undefined)
  //         hasChildProducts = monitorpageconfig.hasChildProducts;

  //       monitorpageconfig = await monitorpageconfig.update({ isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts});
  //     }
      
  //     return { success: true, data: { monitorpageconfig: GetMonitorpageconfig_O(monitorpageconfig) }};
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }

  // async DeleteMonitorpageconfig({ id }: { id: string }): Promise<IResult> {
  //   try {
  //     if (!id)
  //       return {success: false, error: {status: 400, message: '\'id\' is missing'}};

  //     let monitorpageconfig = await Monitorpageconfig.findByPk(id);

  //     if (!monitorpageconfig)
  //       return {success: false, error: {status: 404, message: 'Monitorpageconfig is not existing'}};

  //     await monitorpageconfig.destroy();

  //     return {success: true};
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }

  // async UpdateProcessconfig({ id, monitorpageconfigId, constant, hasConstant }: { id: string, monitorpageconfigId: string, constant: boolean, hasConstant: boolean }): Promise<IResult> {
  //   try {
  //     if (!id)
  //       return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

  //     let processconfig = await Processconfig.findOne({ where: { id, monitorpageconfigId }});

  //     if (!processconfig)
  //       return {success: false, error: {status: 404, message: 'Processconfig is not existing'}};

  //     if (constant != undefined || hasConstant != undefined) {
  //       if (constant == undefined)
  //         constant = processconfig.constant;

  //       if (hasConstant == undefined)
  //         hasConstant = processconfig.hasConstant;

  //       processconfig = await processconfig.update({ constant, hasConstant });
  //     }
      
  //     return { success: true, data: { processconfig: GetProcessconfig_O(processconfig) } };
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }

  // async CreatePipeelement({ monitorpageconfigId, processconfigId}: { monitorpageconfigId: string, processconfigId: string }): Promise<IResult> {
  //   try {
  //     let processconfig = await Processconfig.findByPk(processconfigId);

  //     if (!processconfig || processconfig.monitorpageconfigId != monitorpageconfigId)
  //       return {success: false, error: {status: 404, message: 'Processconfig is not existing'}};

  //     let biggest = 0;
  //     if (processconfig.pipeelements) {
  //       for (let i = 0; i < processconfig.pipeelements.length; i++) {
  //         if (processconfig.pipeelements[i].order > biggest)
  //           biggest = processconfig.pipeelements[i].order;
  //       }
  //     }

  //     let pipeelement = await Pipeelement.create({ processconfigId, command: "", order: biggest+1 });

  //     return {success: true, data: { pipeelement: GetPipeelement_O(pipeelement) }};
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }

  // async UpdatePipeelement({ id, monitorpageconfigId, processconfigId, command, order }:  { id: string, monitorpageconfigId: string, processconfigId: string, command: string, order: number }): Promise<IResult> {
  //   try {
  //     if (!id)
  //       return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

  //     let processconfig = await Processconfig.findByPk(processconfigId);

  //     if (!processconfig || processconfig.monitorpageconfigId != monitorpageconfigId)
  //       return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

  //     let pipeelement = await Pipeelement.findByPk(id);

  //     if (!pipeelement || pipeelement.processconfigId != processconfigId)
  //       return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

  //     if (command || order) {
  //       if (!command)
  //         command = pipeelement.command;

  //       if (!order)
  //         order = pipeelement.order;

  //       pipeelement = await pipeelement.update({ command, order });
  //     }
      
  //     return { success: true, data: { pipeelement: GetPipeelement_O(pipeelement) } };
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }

  // async DeletePipeelement({ id, monitorpageconfigId, processconfigId }: { id: string, monitorpageconfigId: string, processconfigId: string }): Promise<IResult> {
  //   try {
  //     if (!id)
  //       return {success: false, error: {status: 400, message: '\'id\' is missing'}};    

  //     let processconfig = await Processconfig.findByPk(processconfigId);

  //     if (!processconfig || processconfig.monitorpageconfigId != monitorpageconfigId)
  //       return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

  //     let pipeelement = await Pipeelement.findByPk(id);

  //     if (!pipeelement || pipeelement.processconfigId != processconfigId)
  //       return {success: false, error: {status: 404, message: 'Pipeelement is not existing'}};

  //     await pipeelement.destroy();

  //     return {success: true};
  //   } catch (error) {
  //     return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
  //   }
  // }  

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
}