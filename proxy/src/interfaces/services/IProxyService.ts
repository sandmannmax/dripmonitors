import { CreateProxyResponse, DeleteProxyResponse, GetProxiesResponse, GetRandomProxyResponse } from "../../proto/proxy/v1/proxy_pb";

export interface IProxyService {
  getProxies(): Promise<GetProxiesResponse>;
  createProxy({ address }: { address: string }): Promise<CreateProxyResponse>;
  deleteProxy({ proxyId }): Promise<DeleteProxyResponse>;
  getRandomProxy({ monitorpageId, cc }: { monitorpageId: string, cc: string }): Promise<GetRandomProxyResponse>;
}