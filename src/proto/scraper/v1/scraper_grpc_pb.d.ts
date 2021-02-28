// package: scraper.v1
// file: scraper/v1/scraper.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as scraper_v1_scraper_pb from "../../scraper/v1/scraper_pb";

interface IScraperServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getHtml: IScraperServiceService_IGetHtml;
    getProducts: IScraperServiceService_IGetProducts;
}

interface IScraperServiceService_IGetHtml extends grpc.MethodDefinition<scraper_v1_scraper_pb.GetHtmlRequest, scraper_v1_scraper_pb.GetHtmlResponse> {
    path: "/scraper.v1.ScraperService/GetHtml";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scraper_v1_scraper_pb.GetHtmlRequest>;
    requestDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetHtmlRequest>;
    responseSerialize: grpc.serialize<scraper_v1_scraper_pb.GetHtmlResponse>;
    responseDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetHtmlResponse>;
}
interface IScraperServiceService_IGetProducts extends grpc.MethodDefinition<scraper_v1_scraper_pb.GetProductsRequest, scraper_v1_scraper_pb.GetProductsResponse> {
    path: "/scraper.v1.ScraperService/GetProducts";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scraper_v1_scraper_pb.GetProductsRequest>;
    requestDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetProductsRequest>;
    responseSerialize: grpc.serialize<scraper_v1_scraper_pb.GetProductsResponse>;
    responseDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetProductsResponse>;
}

export const ScraperServiceService: IScraperServiceService;

export interface IScraperServiceServer extends grpc.UntypedServiceImplementation {
    getHtml: grpc.handleUnaryCall<scraper_v1_scraper_pb.GetHtmlRequest, scraper_v1_scraper_pb.GetHtmlResponse>;
    getProducts: grpc.handleUnaryCall<scraper_v1_scraper_pb.GetProductsRequest, scraper_v1_scraper_pb.GetProductsResponse>;
}

export interface IScraperServiceClient {
    getHtml(request: scraper_v1_scraper_pb.GetHtmlRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetHtmlResponse) => void): grpc.ClientUnaryCall;
    getHtml(request: scraper_v1_scraper_pb.GetHtmlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetHtmlResponse) => void): grpc.ClientUnaryCall;
    getHtml(request: scraper_v1_scraper_pb.GetHtmlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetHtmlResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: scraper_v1_scraper_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: scraper_v1_scraper_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: scraper_v1_scraper_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
}

export class ScraperServiceClient extends grpc.Client implements IScraperServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getHtml(request: scraper_v1_scraper_pb.GetHtmlRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetHtmlResponse) => void): grpc.ClientUnaryCall;
    public getHtml(request: scraper_v1_scraper_pb.GetHtmlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetHtmlResponse) => void): grpc.ClientUnaryCall;
    public getHtml(request: scraper_v1_scraper_pb.GetHtmlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetHtmlResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: scraper_v1_scraper_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: scraper_v1_scraper_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: scraper_v1_scraper_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
}
