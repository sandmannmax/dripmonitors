// package: proxy.v1
// file: proxy/v1/proxy.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as proxy_v1_proxy_pb from "../../proxy/v1/proxy_pb";

interface IProxyServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getProxies: IProxyServiceService_IGetProxies;
    createProxy: IProxyServiceService_ICreateProxy;
    deleteProxy: IProxyServiceService_IDeleteProxy;
    getRandomProxy: IProxyServiceService_IGetRandomProxy;
    setCooldown: IProxyServiceService_ISetCooldown;
    resetCooldown: IProxyServiceService_IResetCooldown;
}

interface IProxyServiceService_IGetProxies extends grpc.MethodDefinition<proxy_v1_proxy_pb.GetProxiesRequest, proxy_v1_proxy_pb.GetProxiesResponse> {
    path: "/proxy.v1.ProxyService/GetProxies";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proxy_v1_proxy_pb.GetProxiesRequest>;
    requestDeserialize: grpc.deserialize<proxy_v1_proxy_pb.GetProxiesRequest>;
    responseSerialize: grpc.serialize<proxy_v1_proxy_pb.GetProxiesResponse>;
    responseDeserialize: grpc.deserialize<proxy_v1_proxy_pb.GetProxiesResponse>;
}
interface IProxyServiceService_ICreateProxy extends grpc.MethodDefinition<proxy_v1_proxy_pb.CreateProxyRequest, proxy_v1_proxy_pb.CreateProxyResponse> {
    path: "/proxy.v1.ProxyService/CreateProxy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proxy_v1_proxy_pb.CreateProxyRequest>;
    requestDeserialize: grpc.deserialize<proxy_v1_proxy_pb.CreateProxyRequest>;
    responseSerialize: grpc.serialize<proxy_v1_proxy_pb.CreateProxyResponse>;
    responseDeserialize: grpc.deserialize<proxy_v1_proxy_pb.CreateProxyResponse>;
}
interface IProxyServiceService_IDeleteProxy extends grpc.MethodDefinition<proxy_v1_proxy_pb.DeleteProxyRequest, proxy_v1_proxy_pb.DeleteProxyResponse> {
    path: "/proxy.v1.ProxyService/DeleteProxy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proxy_v1_proxy_pb.DeleteProxyRequest>;
    requestDeserialize: grpc.deserialize<proxy_v1_proxy_pb.DeleteProxyRequest>;
    responseSerialize: grpc.serialize<proxy_v1_proxy_pb.DeleteProxyResponse>;
    responseDeserialize: grpc.deserialize<proxy_v1_proxy_pb.DeleteProxyResponse>;
}
interface IProxyServiceService_IGetRandomProxy extends grpc.MethodDefinition<proxy_v1_proxy_pb.GetRandomProxyRequest, proxy_v1_proxy_pb.GetRandomProxyResponse> {
    path: "/proxy.v1.ProxyService/GetRandomProxy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proxy_v1_proxy_pb.GetRandomProxyRequest>;
    requestDeserialize: grpc.deserialize<proxy_v1_proxy_pb.GetRandomProxyRequest>;
    responseSerialize: grpc.serialize<proxy_v1_proxy_pb.GetRandomProxyResponse>;
    responseDeserialize: grpc.deserialize<proxy_v1_proxy_pb.GetRandomProxyResponse>;
}
interface IProxyServiceService_ISetCooldown extends grpc.MethodDefinition<proxy_v1_proxy_pb.SetCooldownRequest, proxy_v1_proxy_pb.SetCooldownResponse> {
    path: "/proxy.v1.ProxyService/SetCooldown";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proxy_v1_proxy_pb.SetCooldownRequest>;
    requestDeserialize: grpc.deserialize<proxy_v1_proxy_pb.SetCooldownRequest>;
    responseSerialize: grpc.serialize<proxy_v1_proxy_pb.SetCooldownResponse>;
    responseDeserialize: grpc.deserialize<proxy_v1_proxy_pb.SetCooldownResponse>;
}
interface IProxyServiceService_IResetCooldown extends grpc.MethodDefinition<proxy_v1_proxy_pb.ResetCooldownRequest, proxy_v1_proxy_pb.ResetCooldownResponse> {
    path: "/proxy.v1.ProxyService/ResetCooldown";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proxy_v1_proxy_pb.ResetCooldownRequest>;
    requestDeserialize: grpc.deserialize<proxy_v1_proxy_pb.ResetCooldownRequest>;
    responseSerialize: grpc.serialize<proxy_v1_proxy_pb.ResetCooldownResponse>;
    responseDeserialize: grpc.deserialize<proxy_v1_proxy_pb.ResetCooldownResponse>;
}

export const ProxyServiceService: IProxyServiceService;

export interface IProxyServiceServer extends grpc.UntypedServiceImplementation {
    getProxies: grpc.handleUnaryCall<proxy_v1_proxy_pb.GetProxiesRequest, proxy_v1_proxy_pb.GetProxiesResponse>;
    createProxy: grpc.handleUnaryCall<proxy_v1_proxy_pb.CreateProxyRequest, proxy_v1_proxy_pb.CreateProxyResponse>;
    deleteProxy: grpc.handleUnaryCall<proxy_v1_proxy_pb.DeleteProxyRequest, proxy_v1_proxy_pb.DeleteProxyResponse>;
    getRandomProxy: grpc.handleUnaryCall<proxy_v1_proxy_pb.GetRandomProxyRequest, proxy_v1_proxy_pb.GetRandomProxyResponse>;
    setCooldown: grpc.handleUnaryCall<proxy_v1_proxy_pb.SetCooldownRequest, proxy_v1_proxy_pb.SetCooldownResponse>;
    resetCooldown: grpc.handleUnaryCall<proxy_v1_proxy_pb.ResetCooldownRequest, proxy_v1_proxy_pb.ResetCooldownResponse>;
}

export interface IProxyServiceClient {
    getProxies(request: proxy_v1_proxy_pb.GetProxiesRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    getProxies(request: proxy_v1_proxy_pb.GetProxiesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    getProxies(request: proxy_v1_proxy_pb.GetProxiesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    createProxy(request: proxy_v1_proxy_pb.CreateProxyRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.CreateProxyResponse) => void): grpc.ClientUnaryCall;
    createProxy(request: proxy_v1_proxy_pb.CreateProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.CreateProxyResponse) => void): grpc.ClientUnaryCall;
    createProxy(request: proxy_v1_proxy_pb.CreateProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.CreateProxyResponse) => void): grpc.ClientUnaryCall;
    deleteProxy(request: proxy_v1_proxy_pb.DeleteProxyRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.DeleteProxyResponse) => void): grpc.ClientUnaryCall;
    deleteProxy(request: proxy_v1_proxy_pb.DeleteProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.DeleteProxyResponse) => void): grpc.ClientUnaryCall;
    deleteProxy(request: proxy_v1_proxy_pb.DeleteProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.DeleteProxyResponse) => void): grpc.ClientUnaryCall;
    getRandomProxy(request: proxy_v1_proxy_pb.GetRandomProxyRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetRandomProxyResponse) => void): grpc.ClientUnaryCall;
    getRandomProxy(request: proxy_v1_proxy_pb.GetRandomProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetRandomProxyResponse) => void): grpc.ClientUnaryCall;
    getRandomProxy(request: proxy_v1_proxy_pb.GetRandomProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetRandomProxyResponse) => void): grpc.ClientUnaryCall;
    setCooldown(request: proxy_v1_proxy_pb.SetCooldownRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.SetCooldownResponse) => void): grpc.ClientUnaryCall;
    setCooldown(request: proxy_v1_proxy_pb.SetCooldownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.SetCooldownResponse) => void): grpc.ClientUnaryCall;
    setCooldown(request: proxy_v1_proxy_pb.SetCooldownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.SetCooldownResponse) => void): grpc.ClientUnaryCall;
    resetCooldown(request: proxy_v1_proxy_pb.ResetCooldownRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.ResetCooldownResponse) => void): grpc.ClientUnaryCall;
    resetCooldown(request: proxy_v1_proxy_pb.ResetCooldownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.ResetCooldownResponse) => void): grpc.ClientUnaryCall;
    resetCooldown(request: proxy_v1_proxy_pb.ResetCooldownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.ResetCooldownResponse) => void): grpc.ClientUnaryCall;
}

export class ProxyServiceClient extends grpc.Client implements IProxyServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getProxies(request: proxy_v1_proxy_pb.GetProxiesRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    public getProxies(request: proxy_v1_proxy_pb.GetProxiesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    public getProxies(request: proxy_v1_proxy_pb.GetProxiesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    public createProxy(request: proxy_v1_proxy_pb.CreateProxyRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.CreateProxyResponse) => void): grpc.ClientUnaryCall;
    public createProxy(request: proxy_v1_proxy_pb.CreateProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.CreateProxyResponse) => void): grpc.ClientUnaryCall;
    public createProxy(request: proxy_v1_proxy_pb.CreateProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.CreateProxyResponse) => void): grpc.ClientUnaryCall;
    public deleteProxy(request: proxy_v1_proxy_pb.DeleteProxyRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.DeleteProxyResponse) => void): grpc.ClientUnaryCall;
    public deleteProxy(request: proxy_v1_proxy_pb.DeleteProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.DeleteProxyResponse) => void): grpc.ClientUnaryCall;
    public deleteProxy(request: proxy_v1_proxy_pb.DeleteProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.DeleteProxyResponse) => void): grpc.ClientUnaryCall;
    public getRandomProxy(request: proxy_v1_proxy_pb.GetRandomProxyRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetRandomProxyResponse) => void): grpc.ClientUnaryCall;
    public getRandomProxy(request: proxy_v1_proxy_pb.GetRandomProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetRandomProxyResponse) => void): grpc.ClientUnaryCall;
    public getRandomProxy(request: proxy_v1_proxy_pb.GetRandomProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.GetRandomProxyResponse) => void): grpc.ClientUnaryCall;
    public setCooldown(request: proxy_v1_proxy_pb.SetCooldownRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.SetCooldownResponse) => void): grpc.ClientUnaryCall;
    public setCooldown(request: proxy_v1_proxy_pb.SetCooldownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.SetCooldownResponse) => void): grpc.ClientUnaryCall;
    public setCooldown(request: proxy_v1_proxy_pb.SetCooldownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.SetCooldownResponse) => void): grpc.ClientUnaryCall;
    public resetCooldown(request: proxy_v1_proxy_pb.ResetCooldownRequest, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.ResetCooldownResponse) => void): grpc.ClientUnaryCall;
    public resetCooldown(request: proxy_v1_proxy_pb.ResetCooldownRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.ResetCooldownResponse) => void): grpc.ClientUnaryCall;
    public resetCooldown(request: proxy_v1_proxy_pb.ResetCooldownRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proxy_v1_proxy_pb.ResetCooldownResponse) => void): grpc.ClientUnaryCall;
}
