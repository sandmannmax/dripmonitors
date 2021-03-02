import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js';
import { ICooldownService } from '../interfaces/services/ICooldownService';
import { IProxyService } from '../interfaces/services/IProxyService';
import { IProxyServiceServer, IProxyServiceService } from '../proto/proxy/v1/proxy_grpc_pb';
import { GetProxiesRequest, GetProxiesResponse, CreateProxyRequest, DeleteProxyRequest, DeleteProxyResponse, GetRandomProxyRequest, SetCooldownRequest, SetCooldownResponse, ResetCooldownRequest, ResetCooldownResponse, Proxy, CreateProxyResponse, GetRandomProxyResponse } from '../proto/proxy/v1/proxy_pb';
import { ServiceFactory } from '../services/factory';

export class ProxyServiceServer implements IProxyServiceServer {
  [name: string]: UntypedHandleCall;

  getProxies(call: ServerUnaryCall<GetProxiesRequest, GetProxiesResponse>, callback: sendUnaryData<GetProxiesResponse>) {
    const proxyService: IProxyService = ServiceFactory.GetProxyService();
    proxyService.getProxies().then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  createProxy(call: ServerUnaryCall<CreateProxyRequest, CreateProxyResponse>, callback: sendUnaryData<CreateProxyResponse>) {
    const proxyService: IProxyService = ServiceFactory.GetProxyService();
    let address = call.request.getAddress();
    proxyService.createProxy({ address }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  deleteProxy(call: ServerUnaryCall<DeleteProxyRequest, DeleteProxyResponse>, callback: sendUnaryData<DeleteProxyResponse>) {
    const proxyService: IProxyService = ServiceFactory.GetProxyService();
    let proxyId = call.request.getId();
    proxyService.deleteProxy({ proxyId }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  getRandomProxy(call: ServerUnaryCall<GetRandomProxyRequest, GetRandomProxyResponse>, callback: sendUnaryData<GetRandomProxyResponse>) {
    const proxyService: IProxyService = ServiceFactory.GetProxyService();
    let monitorpageId = call.request.getMonitorpageId();
    let cc = call.request.getCc();
    proxyService.getRandomProxy({ monitorpageId, cc }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  setCooldown(call: ServerUnaryCall<SetCooldownRequest, SetCooldownResponse>, callback: sendUnaryData<SetCooldownResponse>) {
    const cooldownService: ICooldownService = ServiceFactory.GetCooldownService();
    let monitorpageId = call.request.getMonitorpageId();
    let proxyId = call.request.getProxyId();
    cooldownService.setCooldown({ proxyId, monitorpageId }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  resetCooldown(call: ServerUnaryCall<ResetCooldownRequest, ResetCooldownResponse>, callback: sendUnaryData<ResetCooldownResponse>) {
    const cooldownService: ICooldownService = ServiceFactory.GetCooldownService();
    let monitorpageId = call.request.getMonitorpageId();
    let proxyId = call.request.getProxyId();
    cooldownService.resetCooldown({ proxyId, monitorpageId}).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }
}
