import { ICooldownModel } from "../interfaces/models/ICooldownModel";
import { IProxyModel } from "../interfaces/models/IProxyModel";
import { IProxyService } from "../interfaces/services/IProxyService";
import { CreateProxyResponse, DeleteProxyResponse, GetProxiesResponse, GetRandomProxyResponse, Proxy } from "../proto/proxy/v1/proxy_pb";
import { uuidv4 } from 'uuid';
import { HttpsProxyAgent } from "https-proxy-agent";
import fetch from 'node-fetch';

export class ProxyService implements IProxyService {
  private readonly proxyModel: IProxyModel;
  private readonly cooldownModel: ICooldownModel;

  constructor(proxyModel: IProxyModel, cooldownModel: ICooldownModel) {
    this.proxyModel = proxyModel;
    this.cooldownModel = cooldownModel;
  }

  async getProxies(): Promise<GetProxiesResponse> {
    let proxies = await this.proxyModel.GetProxies();
    let proxiesGrpc = new Proxy[proxies.length];
    for (let i = 0; i < proxies.length; i++) {
      let proxy = new Proxy();
      proxy.setId(proxies[i].id);
      proxy.setAddress(proxies[i].address);
      proxy.setCc(proxies[i].cc);
      proxiesGrpc[i] = proxy;
    }
    let response = new GetProxiesResponse();
    response.setProxiesList(proxiesGrpc);
    return response;
  }

  async createProxy({ address }: { address: string; }): Promise<CreateProxyResponse> {
    let response = new CreateProxyResponse();

    if (!address) {
      response.setMessage('\'address\' is missing');
      response.setSuccess(false);
      return response;
    }

    if (!await this.proxyModel.IsProxyUnused({ address })) {
      response.setMessage('Proxy is already registered');
      response.setSuccess(false);
      return response;
    }

    let responseCheckProxy;
    try {
      let url = 'https://api.myip.com'
      responseCheckProxy = await fetch(url, {
        method: 'GET',
        agent: new HttpsProxyAgent(address),
      });
    } catch (error) {
      response.setMessage('Bad Proxy');
      response.setSuccess(false);
      return response;
    }

    if (responseCheckProxy.status != 200) {
      response.setMessage('Bad Proxy');
      response.setSuccess(false);
      return response;
    }

    let id;
    do {
      id = uuidv4();
    } while (!await this.proxyModel.IdUnused({ id }));

    let json = await responseCheckProxy.json();
      
    let proxy = await this.proxyModel.CreateProxy({ id, address, cc: json.cc });

    response.setSuccess(true);

    let proxyGrpc = new Proxy();
    proxyGrpc.setId(proxy.id);
    proxyGrpc.setAddress(proxy.address);
    proxyGrpc.setCc(proxy.cc);

    response.setProxy(proxyGrpc);
  }

  async deleteProxy({ proxyId }: { proxyId: any; }): Promise<DeleteProxyResponse> {
    let response = new DeleteProxyResponse();

    if (!proxyId) {
      response.setMessage('\'id\' is missing');
      response.setSuccess(false);
      return response;
    } 

    let proxy = await this.proxyModel.GetProxy({ id: proxyId });

    if (!proxy) {
      response.setMessage('Proxy is not existing');
      response.setSuccess(false);
      return response;
    }
    
    await this.proxyModel.DeleteProxy({ id: proxyId });

    response.setSuccess(true);
    return response;
  }

  async getRandomProxy({ monitorpageId, cc }: { monitorpageId: string; cc: string; }): Promise<GetRandomProxyResponse> {
    let response = new GetRandomProxyResponse();

    let proxies = await this.proxyModel.GetProxies();
    if (proxies && proxies.length > 0) {     
      let cooldowns = await this.cooldownModel.GetCooldowns({ monitorpageId });
      for (let i = 0; i < cooldowns.length; i++)
      {
        if (cooldowns[i].remaining > 0) {          
          let index = proxies.findIndex(item => item.id == cooldowns[i].proxyId);
          if (index !== -1)
            proxies.splice(index, 1);
          await this.cooldownModel.SetDownRemaining({ cooldown: cooldowns[i] });
        }
      }
      let index = Math.floor((Math.random() * proxies.length));
      response.setSuccess(true);
      let proxy = new Proxy();
      proxy.setId(proxies[index].id);
      proxy.setAddress(proxies[index].address);
      proxy.setCc(proxies[index].cc);
      response.setProxy(proxy);
    } else {
      response.setSuccess(false);
      response.setMessage("No Proxy available");
    }

    return response;
  }
}