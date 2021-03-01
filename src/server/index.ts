import { sendUnaryData, ServerUnaryCall, UntypedHandleCall } from '@grpc/grpc-js';
import { ICooldownService } from '../interfaces/services/ICooldownService';
import { IProxyService } from '../interfaces/services/IProxyService';
import { IProxyServiceServer, IProxyServiceService } from '../proto/proxy/v1/proxy_grpc_pb';
import { GetProxiesRequest, GetProxiesResponse, CreateProxyRequest, DeleteProxyRequest, DeleteProxyResponse, GetRandomProxyRequest, SetCooldownRequest, SetCooldownResponse, ResetCooldownRequest, ResetCooldownResponse, Proxy, CreateProxyResponse, GetRandomProxyResponse } from '../proto/proxy/v1/proxy_pb';
import { ServiceFactory } from '../services/factory';

const proxyService: IProxyService = ServiceFactory.GetProxyService();
const cooldownService: ICooldownService = ServiceFactory.GetCooldownService();

export class ProxyServiceServer implements IProxyServiceServer {
  [name: string]: UntypedHandleCall;

  getProxies(call: ServerUnaryCall<GetProxiesRequest, GetProxiesResponse>, callback: sendUnaryData<GetProxiesResponse>) {
    proxyService.getProxies().then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  createProxy(call: ServerUnaryCall<CreateProxyRequest, CreateProxyResponse>, callback: sendUnaryData<CreateProxyResponse>) {
    let address = call.request.getAddress();
    proxyService.createProxy({ address }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  deleteProxy(call: ServerUnaryCall<DeleteProxyRequest, DeleteProxyResponse>, callback: sendUnaryData<DeleteProxyResponse>) {
    let proxyId = call.request.getId();
    proxyService.deleteProxy({ proxyId }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  getRandomProxy(call: ServerUnaryCall<GetRandomProxyRequest, GetRandomProxyResponse>, callback: sendUnaryData<GetRandomProxyResponse>) {
    let monitorpageId = call.request.getMonitorpageId();
    let cc = call.request.getCc();
    proxyService.getRandomProxy({ monitorpageId, cc }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  setCooldown(call: ServerUnaryCall<SetCooldownRequest, SetCooldownResponse>, callback: sendUnaryData<SetCooldownResponse>) {
    let monitorpageId = call.request.getMonitorpageId();
    let proxyId = call.request.getProxyId();
    cooldownService.setCooldown({ proxyId, monitorpageId }).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }

  resetCooldown(call: ServerUnaryCall<ResetCooldownRequest, ResetCooldownResponse>, callback: sendUnaryData<ResetCooldownResponse>) {
    let monitorpageId = call.request.getMonitorpageId();
    let proxyId = call.request.getProxyId();
    cooldownService.resetCooldown({ proxyId, monitorpageId}).then(response => {
      callback(null, response);
    }).catch(error => {
      callback(error, null);
    });
  }
}
