// package: monitor.v1
// file: monitor/v1/monitor.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as monitor_v1_monitor_pb from "../../monitor/v1/monitor_pb";

interface IMonitorServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getProducts: IMonitorServiceService_IGetProducts;
    activateProductMonitoring: IMonitorServiceService_IActivateProductMonitoring;
    disableProductMonitoring: IMonitorServiceService_IDisableProductMonitoring;
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

export const MonitorServiceService: IMonitorServiceService;

export interface IMonitorServiceServer extends grpc.UntypedServiceImplementation {
    getProducts: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetProductsRequest, monitor_v1_monitor_pb.GetProductsResponse>;
    activateProductMonitoring: grpc.handleUnaryCall<monitor_v1_monitor_pb.ActivateProductMonitoringRequest, monitor_v1_monitor_pb.ActivateProductMonitoringResponse>;
    disableProductMonitoring: grpc.handleUnaryCall<monitor_v1_monitor_pb.DisableProductMonitoringRequest, monitor_v1_monitor_pb.DisableProductMonitoringResponse>;
    getFilters: grpc.handleUnaryCall<monitor_v1_monitor_pb.GetFiltersRequest, monitor_v1_monitor_pb.GetFiltersResponse>;
    addFilter: grpc.handleUnaryCall<monitor_v1_monitor_pb.AddFilterRequest, monitor_v1_monitor_pb.AddFilterResponse>;
    removeFilter: grpc.handleUnaryCall<monitor_v1_monitor_pb.RemoveFilterRequest, monitor_v1_monitor_pb.RemoveFilterResponse>;
}

export interface IMonitorServiceClient {
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
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
}

export class MonitorServiceClient extends grpc.Client implements IMonitorServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
    public getProducts(request: monitor_v1_monitor_pb.GetProductsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: monitor_v1_monitor_pb.GetProductsResponse) => void): grpc.ClientUnaryCall;
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
}
