// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var monitor_v1_monitor_pb = require('../../monitor/v1/monitor_pb.js');

function serialize_monitor_v1_AddFilterRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.AddFilterRequest)) {
    throw new Error('Expected argument of type monitor.v1.AddFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_AddFilterRequest(buffer_arg) {
  return monitor_v1_monitor_pb.AddFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_AddFilterResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.AddFilterResponse)) {
    throw new Error('Expected argument of type monitor.v1.AddFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_AddFilterResponse(buffer_arg) {
  return monitor_v1_monitor_pb.AddFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_AddMonitoredProductRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.AddMonitoredProductRequest)) {
    throw new Error('Expected argument of type monitor.v1.AddMonitoredProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_AddMonitoredProductRequest(buffer_arg) {
  return monitor_v1_monitor_pb.AddMonitoredProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_AddMonitoredProductResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.AddMonitoredProductResponse)) {
    throw new Error('Expected argument of type monitor.v1.AddMonitoredProductResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_AddMonitoredProductResponse(buffer_arg) {
  return monitor_v1_monitor_pb.AddMonitoredProductResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetFiltersRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetFiltersRequest)) {
    throw new Error('Expected argument of type monitor.v1.GetFiltersRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetFiltersRequest(buffer_arg) {
  return monitor_v1_monitor_pb.GetFiltersRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetFiltersResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetFiltersResponse)) {
    throw new Error('Expected argument of type monitor.v1.GetFiltersResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetFiltersResponse(buffer_arg) {
  return monitor_v1_monitor_pb.GetFiltersResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetProductsRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetProductsRequest)) {
    throw new Error('Expected argument of type monitor.v1.GetProductsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetProductsRequest(buffer_arg) {
  return monitor_v1_monitor_pb.GetProductsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetProductsResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetProductsResponse)) {
    throw new Error('Expected argument of type monitor.v1.GetProductsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetProductsResponse(buffer_arg) {
  return monitor_v1_monitor_pb.GetProductsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_RemoveFilterRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.RemoveFilterRequest)) {
    throw new Error('Expected argument of type monitor.v1.RemoveFilterRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_RemoveFilterRequest(buffer_arg) {
  return monitor_v1_monitor_pb.RemoveFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_RemoveFilterResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.RemoveFilterResponse)) {
    throw new Error('Expected argument of type monitor.v1.RemoveFilterResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_RemoveFilterResponse(buffer_arg) {
  return monitor_v1_monitor_pb.RemoveFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_RemoveMonitoredProductRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.RemoveMonitoredProductRequest)) {
    throw new Error('Expected argument of type monitor.v1.RemoveMonitoredProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_RemoveMonitoredProductRequest(buffer_arg) {
  return monitor_v1_monitor_pb.RemoveMonitoredProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_RemoveMonitoredProductResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.RemoveMonitoredProductResponse)) {
    throw new Error('Expected argument of type monitor.v1.RemoveMonitoredProductResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_RemoveMonitoredProductResponse(buffer_arg) {
  return monitor_v1_monitor_pb.RemoveMonitoredProductResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MonitorServiceService = exports.MonitorServiceService = {
  getProducts: {
    path: '/monitor.v1.MonitorService/GetProducts',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.GetProductsRequest,
    responseType: monitor_v1_monitor_pb.GetProductsResponse,
    requestSerialize: serialize_monitor_v1_GetProductsRequest,
    requestDeserialize: deserialize_monitor_v1_GetProductsRequest,
    responseSerialize: serialize_monitor_v1_GetProductsResponse,
    responseDeserialize: deserialize_monitor_v1_GetProductsResponse,
  },
  addMonitoredProduct: {
    path: '/monitor.v1.MonitorService/AddMonitoredProduct',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.AddMonitoredProductRequest,
    responseType: monitor_v1_monitor_pb.AddMonitoredProductResponse,
    requestSerialize: serialize_monitor_v1_AddMonitoredProductRequest,
    requestDeserialize: deserialize_monitor_v1_AddMonitoredProductRequest,
    responseSerialize: serialize_monitor_v1_AddMonitoredProductResponse,
    responseDeserialize: deserialize_monitor_v1_AddMonitoredProductResponse,
  },
  removeMonitoredProduct: {
    path: '/monitor.v1.MonitorService/RemoveMonitoredProduct',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.RemoveMonitoredProductRequest,
    responseType: monitor_v1_monitor_pb.RemoveMonitoredProductResponse,
    requestSerialize: serialize_monitor_v1_RemoveMonitoredProductRequest,
    requestDeserialize: deserialize_monitor_v1_RemoveMonitoredProductRequest,
    responseSerialize: serialize_monitor_v1_RemoveMonitoredProductResponse,
    responseDeserialize: deserialize_monitor_v1_RemoveMonitoredProductResponse,
  },
  getFilters: {
    path: '/monitor.v1.MonitorService/GetFilters',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.GetFiltersRequest,
    responseType: monitor_v1_monitor_pb.GetFiltersResponse,
    requestSerialize: serialize_monitor_v1_GetFiltersRequest,
    requestDeserialize: deserialize_monitor_v1_GetFiltersRequest,
    responseSerialize: serialize_monitor_v1_GetFiltersResponse,
    responseDeserialize: deserialize_monitor_v1_GetFiltersResponse,
  },
  addFilter: {
    path: '/monitor.v1.MonitorService/AddFilter',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.AddFilterRequest,
    responseType: monitor_v1_monitor_pb.AddFilterResponse,
    requestSerialize: serialize_monitor_v1_AddFilterRequest,
    requestDeserialize: deserialize_monitor_v1_AddFilterRequest,
    responseSerialize: serialize_monitor_v1_AddFilterResponse,
    responseDeserialize: deserialize_monitor_v1_AddFilterResponse,
  },
  removeFilter: {
    path: '/monitor.v1.MonitorService/RemoveFilter',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.RemoveFilterRequest,
    responseType: monitor_v1_monitor_pb.RemoveFilterResponse,
    requestSerialize: serialize_monitor_v1_RemoveFilterRequest,
    requestDeserialize: deserialize_monitor_v1_RemoveFilterRequest,
    responseSerialize: serialize_monitor_v1_RemoveFilterResponse,
    responseDeserialize: deserialize_monitor_v1_RemoveFilterResponse,
  },
};

exports.MonitorServiceClient = grpc.makeGenericClientConstructor(MonitorServiceService);
