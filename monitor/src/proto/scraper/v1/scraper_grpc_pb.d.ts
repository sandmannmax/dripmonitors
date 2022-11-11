// package: scraper.v1
// file: scraper/v1/scraper.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as scraper_v1_scraper_pb from "../../scraper/v1/scraper_pb";

interface IScraperServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    scrape: IScraperServiceService_IScrape;
    getProxies: IScraperServiceService_IGetProxies;
    addProxy: IScraperServiceService_IAddProxy;
    removeProxy: IScraperServiceService_IRemoveProxy;
}

interface IScraperServiceService_IScrape extends grpc.MethodDefinition<scraper_v1_scraper_pb.ScrapeRequest, scraper_v1_scraper_pb.ScrapeResponse> {
    path: "/scraper.v1.ScraperService/Scrape";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scraper_v1_scraper_pb.ScrapeRequest>;
    requestDeserialize: grpc.deserialize<scraper_v1_scraper_pb.ScrapeRequest>;
    responseSerialize: grpc.serialize<scraper_v1_scraper_pb.ScrapeResponse>;
    responseDeserialize: grpc.deserialize<scraper_v1_scraper_pb.ScrapeResponse>;
}
interface IScraperServiceService_IGetProxies extends grpc.MethodDefinition<scraper_v1_scraper_pb.GetProxiesRequest, scraper_v1_scraper_pb.GetProxiesResponse> {
    path: "/scraper.v1.ScraperService/GetProxies";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scraper_v1_scraper_pb.GetProxiesRequest>;
    requestDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetProxiesRequest>;
    responseSerialize: grpc.serialize<scraper_v1_scraper_pb.GetProxiesResponse>;
    responseDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetProxiesResponse>;
}
interface IScraperServiceService_IAddProxy extends grpc.MethodDefinition<scraper_v1_scraper_pb.AddProxyRequest, scraper_v1_scraper_pb.AddProxyResponse> {
    path: "/scraper.v1.ScraperService/AddProxy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scraper_v1_scraper_pb.AddProxyRequest>;
    requestDeserialize: grpc.deserialize<scraper_v1_scraper_pb.AddProxyRequest>;
    responseSerialize: grpc.serialize<scraper_v1_scraper_pb.AddProxyResponse>;
    responseDeserialize: grpc.deserialize<scraper_v1_scraper_pb.AddProxyResponse>;
}
interface IScraperServiceService_IRemoveProxy extends grpc.MethodDefinition<scraper_v1_scraper_pb.RemoveProxyRequest, scraper_v1_scraper_pb.RemoveProxyRequest> {
    path: "/scraper.v1.ScraperService/RemoveProxy";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scraper_v1_scraper_pb.RemoveProxyRequest>;
    requestDeserialize: grpc.deserialize<scraper_v1_scraper_pb.RemoveProxyRequest>;
    responseSerialize: grpc.serialize<scraper_v1_scraper_pb.RemoveProxyRequest>;
    responseDeserialize: grpc.deserialize<scraper_v1_scraper_pb.RemoveProxyRequest>;
}

export const ScraperServiceService: IScraperServiceService;

export interface IScraperServiceServer extends grpc.UntypedServiceImplementation {
    scrape: grpc.handleUnaryCall<scraper_v1_scraper_pb.ScrapeRequest, scraper_v1_scraper_pb.ScrapeResponse>;
    getProxies: grpc.handleUnaryCall<scraper_v1_scraper_pb.GetProxiesRequest, scraper_v1_scraper_pb.GetProxiesResponse>;
    addProxy: grpc.handleUnaryCall<scraper_v1_scraper_pb.AddProxyRequest, scraper_v1_scraper_pb.AddProxyResponse>;
    removeProxy: grpc.handleUnaryCall<scraper_v1_scraper_pb.RemoveProxyRequest, scraper_v1_scraper_pb.RemoveProxyRequest>;
}

export interface IScraperServiceClient {
    scrape(request: scraper_v1_scraper_pb.ScrapeRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.ScrapeResponse) => void): grpc.ClientUnaryCall;
    scrape(request: scraper_v1_scraper_pb.ScrapeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.ScrapeResponse) => void): grpc.ClientUnaryCall;
    scrape(request: scraper_v1_scraper_pb.ScrapeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.ScrapeResponse) => void): grpc.ClientUnaryCall;
    getProxies(request: scraper_v1_scraper_pb.GetProxiesRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    getProxies(request: scraper_v1_scraper_pb.GetProxiesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    getProxies(request: scraper_v1_scraper_pb.GetProxiesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    addProxy(request: scraper_v1_scraper_pb.AddProxyRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.AddProxyResponse) => void): grpc.ClientUnaryCall;
    addProxy(request: scraper_v1_scraper_pb.AddProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.AddProxyResponse) => void): grpc.ClientUnaryCall;
    addProxy(request: scraper_v1_scraper_pb.AddProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.AddProxyResponse) => void): grpc.ClientUnaryCall;
    removeProxy(request: scraper_v1_scraper_pb.RemoveProxyRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.RemoveProxyRequest) => void): grpc.ClientUnaryCall;
    removeProxy(request: scraper_v1_scraper_pb.RemoveProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.RemoveProxyRequest) => void): grpc.ClientUnaryCall;
    removeProxy(request: scraper_v1_scraper_pb.RemoveProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.RemoveProxyRequest) => void): grpc.ClientUnaryCall;
}

export class ScraperServiceClient extends grpc.Client implements IScraperServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public scrape(request: scraper_v1_scraper_pb.ScrapeRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.ScrapeResponse) => void): grpc.ClientUnaryCall;
    public scrape(request: scraper_v1_scraper_pb.ScrapeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.ScrapeResponse) => void): grpc.ClientUnaryCall;
    public scrape(request: scraper_v1_scraper_pb.ScrapeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.ScrapeResponse) => void): grpc.ClientUnaryCall;
    public getProxies(request: scraper_v1_scraper_pb.GetProxiesRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    public getProxies(request: scraper_v1_scraper_pb.GetProxiesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    public getProxies(request: scraper_v1_scraper_pb.GetProxiesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProxiesResponse) => void): grpc.ClientUnaryCall;
    public addProxy(request: scraper_v1_scraper_pb.AddProxyRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.AddProxyResponse) => void): grpc.ClientUnaryCall;
    public addProxy(request: scraper_v1_scraper_pb.AddProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.AddProxyResponse) => void): grpc.ClientUnaryCall;
    public addProxy(request: scraper_v1_scraper_pb.AddProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.AddProxyResponse) => void): grpc.ClientUnaryCall;
    public removeProxy(request: scraper_v1_scraper_pb.RemoveProxyRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.RemoveProxyRequest) => void): grpc.ClientUnaryCall;
    public removeProxy(request: scraper_v1_scraper_pb.RemoveProxyRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.RemoveProxyRequest) => void): grpc.ClientUnaryCall;
    public removeProxy(request: scraper_v1_scraper_pb.RemoveProxyRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.RemoveProxyRequest) => void): grpc.ClientUnaryCall;
}
