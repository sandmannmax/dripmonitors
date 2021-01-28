import { Service } from 'typedi';
import { IResult } from '../types/IResult';
import { logger } from '../logger';
import { ProxyModel } from '../models/Proxy';
import fetch from 'node-fetch';
import { HttpsProxyAgent } from 'https-proxy-agent';

@Service()
export class ProxyService {

  async GetProxies(): Promise<IResult> {
    try {
      let proxies = await ProxyModel.GetProxies();
      return {success: true, data: { proxies }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async CreateProxy({ address, port } : { address: string, port: number }): Promise<IResult> {
    try {
      if (!address)
        return {success: false, error: {status: 404, message: '\'address\' missing'}};
        
      if (!port)
        return {success: false, error: {status: 404, message: '\'port\' missing'}};

      if (!await ProxyModel.IsProxyUnused({ address, port }))
        return {success: false, error: {status: 404, message: 'Proxy is already registered'}};

      let response;
      try {
        let url = 'https://api.myip.com'
        let proxyString = `${address}:${port}`;
        response = await fetch(url, {
          method: 'GET',
          agent: new HttpsProxyAgent(proxyString),
        });
      } catch (error) {
        logger.warn("Error in Proxy Testing: " + error);
        return {success: false, error: {status: 404, message: 'Bad Proxy'}};
      }

      if (response.status == 200) {
        let json = await response.json();

        logger.info(json.ip);
        
        let proxy = await ProxyModel.CreateProxy({ address, port });
      
        return {success: true, data: { proxy }};
      } else {
        logger.warn('Bad Proxy Request');

        return {success: false, error: {status: 404, message: 'Bad Proxy'}};
      }  
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}