// package: monitor.v1
// file: monitor/v1/monitor.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as monitor_v1_monitor_pb from "../../monitor/v1/monitor_pb";

interface IMonitorServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getProducts: IMonitorServiceService_IGetProducts;
    addMonitoredProduct: IMonitorServiceService_IAddMonitoredProduct;
    removeMonitoredProduct: IMonitorServiceService_IRemoveMonitoredProduct;
    getFilters: IMonitorServiceService_IGetFilters;
    addFilter: IMonitorServiceService_IAddFilter;
    removeFilter: IMonitorServiceService_IRemoveFilter;
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
interface IMonitorServiceService_IAddMonitoredProduct extends grpc.MethodDefinition<monitor_v1_monitor_pb.AddMonitoredProductRequest, monitor_v1_monitor_pb.AddMonitoredProductResponse> {
    path: "/monitor.v1.MonitorService/AddMonitoredProduct";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.AddMonitoredProductRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.AddMonitoredProductRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.AddMonitoredProductResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.AddMonitoredProductResponse>;
}
interface IMonitorServiceService_IRemoveMonitoredProduct extends grpc.MethodDefinition<monitor_v1_monitor_pb.RemoveMonitoredProductRequest, monitor_v1_monitor_pb.RemoveMonitoredProductResponse> {
    path: "/monitor.v1.MonitorService/RemoveMonitoredProduct";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<monitor_v1_monitor_pb.RemoveMonitoredProductRequest>;
    requestDeserialize: grpc.deserialize<monitor_v1_monitor_pb.RemoveMonitoredProductRequest>;
    responseSerialize: grpc.serialize<monitor_v1_monitor_pb.RemoveMonitoredProductResponse>;
    responseDeserialize: grpc.deserialize<monitor_v1_monitor_pb.RemoveMonitoredProductResponse>;
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

export const MonitorServiceService: IMonitorServiceService;

export interface IMonitorServiceServer extends grpc.UntypedServiceImplementation {
    getProducts: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetProductsRequest, monitor_v1_monitor_pb.GetProductsResponse>;
    addMonitoredProduct: grpc.handleUnaryCall<monitor_v1_monitor_pb.AddMonitoredProductRequest, monitor_v1_monitor_pb.AddMonitoredProductResponse>;
    removeMonitoredProduct: grpc.handleUnaryCall<monitor_v1_monitor_pb.RemoveMonitoredProductRequest, monitor_v1_monitor_pb.RemoveMonitoredProductResponse>;
    getFilters: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetFiltersRequest, monitor_v1_monitor_pb.GetFiltersResponse>;
    addFilter: grpc.handleUnaryCall<monitor_v1_monitor_pb.AddFilterRequest, monitor_v1_monitor_pb.AddFilterResponse>;
    removeFilter: grpc.handleUnaryCall<monitor_v1_monitor_pb.RemoveFilterRequest, monitor_v1_monitor_pb.RemoveFilterResponse>;
}

export interface IMonitorServiceClient {
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    addMonitoredProduct(request: monitor_v1_monitor_pb.AddMonitoredProductRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    addMonitoredProduct(request: monitor_v1_monitor_pb.AddMonitoredProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    addMonitoredProduct(request: monitor_v1_monitor_pb.AddMonitoredProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    removeMonitoredProduct(request: monitor_v1_monitor_pb.RemoveMonitoredProductRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    removeMonitoredProduct(request: monitor_v1_monitor_pb.RemoveMonitoredProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    removeMonitoredProduct(request: monitor_v1_monitor_pb.RemoveMonitoredProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
}

export class MonitorServiceClient extends grpc.Client implements IMonitorServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public addMonitoredProduct(request: monitor_v1_monitor_pb.AddMonitoredProductRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    public addMonitoredProduct(request: monitor_v1_monitor_pb.AddMonitoredProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    public addMonitoredProduct(request: monitor_v1_monitor_pb.AddMonitoredProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    public removeMonitoredProduct(request: monitor_v1_monitor_pb.RemoveMonitoredProductRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    public removeMonitoredProduct(request: monitor_v1_monitor_pb.RemoveMonitoredProductRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    public removeMonitoredProduct(request: monitor_v1_monitor_pb.RemoveMonitoredProductRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveMonitoredProductResponse) => void): grpc.ClientUnaryCall;
    public getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    public getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    public getFilters(request: monitor_v1_monitor_pb.GetFiltersRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetFiltersResponse) => void): grpc.ClientUnaryCall;
    public addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    public addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    public addFilter(request: monitor_v1_monitor_pb.AddFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.AddFilterResponse) => void): grpc.ClientUnaryCall;
    public removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    public removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
    public removeFilter(request: monitor_v1_monitor_pb.RemoveFilterRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.RemoveFilterResponse) => void): grpc.ClientUnaryCall;
}
