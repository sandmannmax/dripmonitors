// package: monitor.v1
// file: monitor/v1/monitor.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as monitor_v1_monitor_pb from "../../monitor/v1/monitor_pb";

interface IMonitorServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getMonitorpages: IMonitorServiceService_IGetMonitorpages;
    getMonitorpage: IMonitorServiceService_IGetMonitorpage;
    getProducts: IMonitorServiceService_IGetProducts;
    getProduct: IMonitorServiceService_IGetProduct;
    activateProductMonitoring: IMonitorServiceService_IActivateProductMonitoring;
    disableProductMonitoring: IMonitorServiceService_IDisableProductMonitoring;
    getFilters: IMonitorServiceService_IGetFilters;
    addFilter: IMonitorServiceService_IAddFilter;
    removeFilter: IMonitorServiceService_IRemoveFilter;
    getUrls: IMonitorServiceService_IGetUrls;
    addUrl: IMonitorServiceService_IAddUrl;
    removeUrl: IMonitorServiceService_IRemoveUrl;
    startMonitorpage: IMonitorServiceService_IStartMonitorpage;
    stopMonitorpage: IMonitorServiceService_IStopMonitorpage;
}

interface IMonitorServiceService_IGetMonitorpages extends grpc.MethodDefinition<monitor_v1_monitor_pb.GetMonitorpagesRequest, monitor_v1_monitor_pb.GetMonitorpagesResponse> {
    path: "/monitor.v1.MonitorService/GetMonitorpages";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.GetMonitorpagesRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetMonitorpagesRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.GetMonitorpagesResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetMonitorpagesResponse>;
}
interface IMonitorServiceService_IGetMonitorpage extends grpc.MethodDefinition<monitor_v1_monitor_pb.GetMonitorpageRequest, monitor_v1_monitor_pb.GetMonitorpageResponse> {
    path: "/monitor.v1.MonitorService/GetMonitorpage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.GetMonitorpageRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetMonitorpageRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.GetMonitorpageResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetMonitorpageResponse>;
}
interface IMonitorServiceService_IGetProducts extends grpc.MethodDefinition<monitor_v1_monitor_pb.GetProductsRequest, monitor_v1_monitor_pb.GetProductsResponse> {
    path: "/monitor.v1.MonitorService/GetProducts";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.GetProductsRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetProductsRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.GetProductsResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetProductsResponse>;
}
interface IMonitorServiceService_IGetProduct extends grpc.MethodDefinition<monitor_v1_monitor_pb.GetProductRequest, monitor_v1_monitor_pb.GetProductResponse> {
    path: "/monitor.v1.MonitorService/GetProduct";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.GetProductRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetProductRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.GetProductResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetProductResponse>;
}
interface IMonitorServiceService_IActivateProductMonitoring extends grpc.MethodDefinition<monitor_v1_monitor_pb.ActivateProductMonitoringRequest, monitor_v1_monitor_pb.ActivateProductMonitoringResponse> {
    path: "/monitor.v1.MonitorService/ActivateProductMonitoring";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.ActivateProductMonitoringRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.ActivateProductMonitoringRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.ActivateProductMonitoringResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.ActivateProductMonitoringResponse>;
}
interface IMonitorServiceService_IDisableProductMonitoring extends grpc.MethodDefinition<monitor_v1_monitor_pb.DisableProductMonitoringRequest, monitor_v1_monitor_pb.DisableProductMonitoringResponse> {
    path: "/monitor.v1.MonitorService/DisableProductMonitoring";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.DisableProductMonitoringRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.DisableProductMonitoringRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.DisableProductMonitoringResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.DisableProductMonitoringResponse>;
}
interface IMonitorServiceService_IGetFilters extends grpc.MethodDefinition<monitor_v1_monitor_pb.GetFiltersRequest, monitor_v1_monitor_pb.GetFiltersResponse> {
    path: "/monitor.v1.MonitorService/GetFilters";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.GetFiltersRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetFiltersRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.GetFiltersResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetFiltersResponse>;
}
interface IMonitorServiceService_IAddFilter extends grpc.MethodDefinition<monitor_v1_monitor_pb.AddFilterRequest, monitor_v1_monitor_pb.AddFilterResponse> {
    path: "/monitor.v1.MonitorService/AddFilter";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.AddFilterRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.AddFilterRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.AddFilterResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.AddFilterResponse>;
}
interface IMonitorServiceService_IRemoveFilter extends grpc.MethodDefinition<monitor_v1_monitor_pb.RemoveFilterRequest, monitor_v1_monitor_pb.RemoveFilterResponse> {
    path: "/monitor.v1.MonitorService/RemoveFilter";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.RemoveFilterRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.RemoveFilterRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.RemoveFilterResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.RemoveFilterResponse>;
}
interface IMonitorServiceService_IGetUrls extends grpc.MethodDefinition<monitor_v1_monitor_pb.GetUrlsRequest, monitor_v1_monitor_pb.GetUrlsResponse> {
    path: "/monitor.v1.MonitorService/GetUrls";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.GetUrlsRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetUrlsRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.GetUrlsResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.GetUrlsResponse>;
}
interface IMonitorServiceService_IAddUrl extends grpc.MethodDefinition<monitor_v1_monitor_pb.AddUrlRequest, monitor_v1_monitor_pb.AddUrlResponse> {
    path: "/monitor.v1.MonitorService/AddUrl";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.AddUrlRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.AddUrlRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.AddUrlResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.AddUrlResponse>;
}
interface IMonitorServiceService_IRemoveUrl extends grpc.MethodDefinition<monitor_v1_monitor_pb.RemoveUrlRequest, monitor_v1_monitor_pb.RemoveUrlResponse> {
    path: "/monitor.v1.MonitorService/RemoveUrl";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.RemoveUrlRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.RemoveUrlRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.RemoveUrlResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.RemoveUrlResponse>;
}
interface IMonitorServiceService_IStartMonitorpage extends grpc.MethodDefinition<monitor_v1_monitor_pb.StartMonitorpageRequest, monitor_v1_monitor_pb.StartMonitorpageResponse> {
    path: "/monitor.v1.MonitorService/StartMonitorpage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.StartMonitorpageRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.StartMonitorpageRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.StartMonitorpageResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.StartMonitorpageResponse>;
}
interface IMonitorServiceService_IStopMonitorpage extends grpc.MethodDefinition<monitor_v1_monitor_pb.StopMonitorpageRequest, monitor_v1_monitor_pb.StopMonitorpageResponse> {
    path: "/monitor.v1.MonitorService/StopMonitorpage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.StopMonitorpageRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.StopMonitorpageRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.StopMonitorpageResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.StopMonitorpageResponse>;
}

export const MonitorServiceService: IMonitorServiceService;

export interface IMonitorServiceServer extends grpc.UntypedServiceImplementation {
    getMonitorpages: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetMonitorpagesRequest, monitor_v1_monitor_pb.GetMonitorpagesResponse>;
    getMonitorpage: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetMonitorpageRequest, monitor_v1_monitor_pb.GetMonitorpageResponse>;
    getProducts: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetProductsRequest, monitor_v1_monitor_pb.GetProductsResponse>;
    getProduct: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetProductRequest, monitor_v1_monitor_pb.GetProductResponse>;
    activateProductMonitoring: grpc.handleUnaryCall<monitor_v1_monitor_pb.ActivateProductMonitoringRequest, monitor_v1_monitor_pb.ActivateProductMonitoringResponse>;
    disableProductMonitoring: grpc.handleUnaryCall<monitor_v1_monitor_pb.DisableProductMonitoringRequest, monitor_v1_monitor_pb.DisableProductMonitoringResponse>;
    getFilters: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetFiltersRequest, monitor_v1_monitor_pb.GetFiltersResponse>;
    addFilter: grpc.handleUnaryCall<monitor_v1_monitor_pb.AddFilterRequest, monitor_v1_monitor_pb.AddFilterResponse>;
    removeFilter: grpc.handleUnaryCall<monitor_v1_monitor_pb.RemoveFilterRequest, monitor_v1_monitor_pb.RemoveFilterResponse>;
    getUrls: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetUrlsRequest, monitor_v1_monitor_pb.GetUrlsResponse>;
    addUrl: grpc.handleUnaryCall<monitor_v1_monitor_pb.AddUrlRequest, monitor_v1_monitor_pb.AddUrlResponse>;
    removeUrl: grpc.handleUnaryCall<monitor_v1_monitor_pb.RemoveUrlRequest, monitor_v1_monitor_pb.RemoveUrlResponse>;
    startMonitorpage: grpc.handleUnaryCall<monitor_v1_monitor_pb.StartMonitorpageRequest, monitor_v1_monitor_pb.StartMonitorpageResponse>;
    stopMonitorpage: grpc.handleUnaryCall<monitor_v1_monitor_pb.StopMonitorpageRequest, monitor_v1_monitor_pb.StopMonitorpageResponse>;
}

export interface IMonitorServiceClient {
    getMonitorpages(request: monitor_v1_monitor_pb.GetMonitorpagesRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpagesResponse) => void): grpc.ClientUnaryCall;
    getMonitorpages(request: monitor_v1_monitor_pb.GetMonitorpagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpagesResponse) => void): grpc.ClientUnaryCall;
    getMonitorpages(request: monitor_v1_monitor_pb.GetMonitorpagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpagesResponse) => void): grpc.ClientUnaryCall;
    getMonitorpage(request: monitor_v1_monitor_pb.GetMonitorpageRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpageResponse) => void): grpc.ClientUnaryCall;
    getMonitorpage(request: monitor_v1_monitor_pb.GetMonitorpageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpageResponse) => void): grpc.ClientUnaryCall;
    getMonitorpage(request: monitor_v1_monitor_pb.GetMonitorpageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpageResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProduct(request: monitor_v1_monitor_pb.GetProductRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    getProduct(request: monitor_v1_monitor_pb.GetProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    getProduct(request: monitor_v1_monitor_pb.GetProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    activateProductMonitoring(request: monitor_v1_monitor_pb.ActivateProductMonitoringRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.ActivateProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    activateProductMonitoring(request: monitor_v1_monitor_pb.ActivateProductMonitoringRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.ActivateProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    activateProductMonitoring(request: monitor_v1_monitor_pb.ActivateProductMonitoringRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.ActivateProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    disableProductMonitoring(request: monitor_v1_monitor_pb.DisableProductMonitoringRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.DisableProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    disableProductMonitoring(request: monitor_v1_monitor_pb.DisableProductMonitoringRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.DisableProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    disableProductMonitoring(request: monitor_v1_monitor_pb.DisableProductMonitoringRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.DisableProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    getUrls(request: monitor_v1_monitor_pb.GetUrlsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetUrlsResponse) => void): grpc.ClientUnaryCall;
    getUrls(request: monitor_v1_monitor_pb.GetUrlsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetUrlsResponse) => void): grpc.ClientUnaryCall;
    getUrls(request: monitor_v1_monitor_pb.GetUrlsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetUrlsResponse) => void): grpc.ClientUnaryCall;
    addUrl(request: monitor_v1_monitor_pb.AddUrlRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddUrlResponse) => void): grpc.ClientUnaryCall;
    addUrl(request: monitor_v1_monitor_pb.AddUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddUrlResponse) => void): grpc.ClientUnaryCall;
    addUrl(request: monitor_v1_monitor_pb.AddUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddUrlResponse) => void): grpc.ClientUnaryCall;
    removeUrl(request: monitor_v1_monitor_pb.RemoveUrlRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveUrlResponse) => void): grpc.ClientUnaryCall;
    removeUrl(request: monitor_v1_monitor_pb.RemoveUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveUrlResponse) => void): grpc.ClientUnaryCall;
    removeUrl(request: monitor_v1_monitor_pb.RemoveUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveUrlResponse) => void): grpc.ClientUnaryCall;
    startMonitorpage(request: monitor_v1_monitor_pb.StartMonitorpageRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StartMonitorpageResponse) => void): grpc.ClientUnaryCall;
    startMonitorpage(request: monitor_v1_monitor_pb.StartMonitorpageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StartMonitorpageResponse) => void): grpc.ClientUnaryCall;
    startMonitorpage(request: monitor_v1_monitor_pb.StartMonitorpageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StartMonitorpageResponse) => void): grpc.ClientUnaryCall;
    stopMonitorpage(request: monitor_v1_monitor_pb.StopMonitorpageRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StopMonitorpageResponse) => void): grpc.ClientUnaryCall;
    stopMonitorpage(request: monitor_v1_monitor_pb.StopMonitorpageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StopMonitorpageResponse) => void): grpc.ClientUnaryCall;
    stopMonitorpage(request: monitor_v1_monitor_pb.StopMonitorpageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StopMonitorpageResponse) => void): grpc.ClientUnaryCall;
}

export class MonitorServiceClient extends grpc.Client implements IMonitorServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getMonitorpages(request: monitor_v1_monitor_pb.GetMonitorpagesRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpagesResponse) => void): grpc.ClientUnaryCall;
    public getMonitorpages(request: monitor_v1_monitor_pb.GetMonitorpagesRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpagesResponse) => void): grpc.ClientUnaryCall;
    public getMonitorpages(request: monitor_v1_monitor_pb.GetMonitorpagesRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpagesResponse) => void): grpc.ClientUnaryCall;
    public getMonitorpage(request: monitor_v1_monitor_pb.GetMonitorpageRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public getMonitorpage(request: monitor_v1_monitor_pb.GetMonitorpageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public getMonitorpage(request: monitor_v1_monitor_pb.GetMonitorpageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProduct(request: monitor_v1_monitor_pb.GetProductRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    public getProduct(request: monitor_v1_monitor_pb.GetProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    public getProduct(request: monitor_v1_monitor_pb.GetProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductResponse) => void): grpc.ClientUnaryCall;
    public activateProductMonitoring(request: monitor_v1_monitor_pb.ActivateProductMonitoringRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.ActivateProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    public activateProductMonitoring(request: monitor_v1_monitor_pb.ActivateProductMonitoringRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.ActivateProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    public activateProductMonitoring(request: monitor_v1_monitor_pb.ActivateProductMonitoringRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.ActivateProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    public disableProductMonitoring(request: monitor_v1_monitor_pb.DisableProductMonitoringRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.DisableProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    public disableProductMonitoring(request: monitor_v1_monitor_pb.DisableProductMonitoringRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.DisableProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    public disableProductMonitoring(request: monitor_v1_monitor_pb.DisableProductMonitoringRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.DisableProductMonitoringResponse) => void): grpc.ClientUnaryCall;
    public getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    public getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    public getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    public addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    public addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    public addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    public removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    public removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    public removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    public getUrls(request: monitor_v1_monitor_pb.GetUrlsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetUrlsResponse) => void): grpc.ClientUnaryCall;
    public getUrls(request: monitor_v1_monitor_pb.GetUrlsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetUrlsResponse) => void): grpc.ClientUnaryCall;
    public getUrls(request: monitor_v1_monitor_pb.GetUrlsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetUrlsResponse) => void): grpc.ClientUnaryCall;
    public addUrl(request: monitor_v1_monitor_pb.AddUrlRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddUrlResponse) => void): grpc.ClientUnaryCall;
    public addUrl(request: monitor_v1_monitor_pb.AddUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddUrlResponse) => void): grpc.ClientUnaryCall;
    public addUrl(request: monitor_v1_monitor_pb.AddUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddUrlResponse) => void): grpc.ClientUnaryCall;
    public removeUrl(request: monitor_v1_monitor_pb.RemoveUrlRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveUrlResponse) => void): grpc.ClientUnaryCall;
    public removeUrl(request: monitor_v1_monitor_pb.RemoveUrlRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveUrlResponse) => void): grpc.ClientUnaryCall;
    public removeUrl(request: monitor_v1_monitor_pb.RemoveUrlRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveUrlResponse) => void): grpc.ClientUnaryCall;
    public startMonitorpage(request: monitor_v1_monitor_pb.StartMonitorpageRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StartMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public startMonitorpage(request: monitor_v1_monitor_pb.StartMonitorpageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StartMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public startMonitorpage(request: monitor_v1_monitor_pb.StartMonitorpageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StartMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public stopMonitorpage(request: monitor_v1_monitor_pb.StopMonitorpageRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StopMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public stopMonitorpage(request: monitor_v1_monitor_pb.StopMonitorpageRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StopMonitorpageResponse) => void): grpc.ClientUnaryCall;
    public stopMonitorpage(request: monitor_v1_monitor_pb.StopMonitorpageRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.StopMonitorpageResponse) => void): grpc.ClientUnaryCall;
}
