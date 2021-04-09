// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var monitor_v1_monitor_pb = require('../../monitor/v1/monitor_pb.js');

function serialize_monitor_v1_ActivateProductMonitoringRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.ActivateProductMonitoringRequest)) {
    throw new Error('Expected argument of type monitor.v1.ActivateProductMonitoringRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_ActivateProductMonitoringRequest(buffer_arg) {
  return monitor_v1_monitor_pb.ActivateProductMonitoringRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_ActivateProductMonitoringResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.ActivateProductMonitoringResponse)) {
    throw new Error('Expected argument of type monitor.v1.ActivateProductMonitoringResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_ActivateProductMonitoringResponse(buffer_arg) {
  return monitor_v1_monitor_pb.ActivateProductMonitoringResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

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

function serialize_monitor_v1_AddUrlRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.AddUrlRequest)) {
    throw new Error('Expected argument of type monitor.v1.AddUrlRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_AddUrlRequest(buffer_arg) {
  return monitor_v1_monitor_pb.AddUrlRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_AddUrlResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.AddUrlResponse)) {
    throw new Error('Expected argument of type monitor.v1.AddUrlResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_AddUrlResponse(buffer_arg) {
  return monitor_v1_monitor_pb.AddUrlResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_DisableProductMonitoringRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.DisableProductMonitoringRequest)) {
    throw new Error('Expected argument of type monitor.v1.DisableProductMonitoringRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_DisableProductMonitoringRequest(buffer_arg) {
  return monitor_v1_monitor_pb.DisableProductMonitoringRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_DisableProductMonitoringResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.DisableProductMonitoringResponse)) {
    throw new Error('Expected argument of type monitor.v1.DisableProductMonitoringResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_DisableProductMonitoringResponse(buffer_arg) {
  return monitor_v1_monitor_pb.DisableProductMonitoringResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_monitor_v1_GetMonitorpageRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetMonitorpageRequest)) {
    throw new Error('Expected argument of type monitor.v1.GetMonitorpageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetMonitorpageRequest(buffer_arg) {
  return monitor_v1_monitor_pb.GetMonitorpageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetMonitorpageResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetMonitorpageResponse)) {
    throw new Error('Expected argument of type monitor.v1.GetMonitorpageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetMonitorpageResponse(buffer_arg) {
  return monitor_v1_monitor_pb.GetMonitorpageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetMonitorpagesRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetMonitorpagesRequest)) {
    throw new Error('Expected argument of type monitor.v1.GetMonitorpagesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetMonitorpagesRequest(buffer_arg) {
  return monitor_v1_monitor_pb.GetMonitorpagesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetMonitorpagesResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetMonitorpagesResponse)) {
    throw new Error('Expected argument of type monitor.v1.GetMonitorpagesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetMonitorpagesResponse(buffer_arg) {
  return monitor_v1_monitor_pb.GetMonitorpagesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetProductRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetProductRequest)) {
    throw new Error('Expected argument of type monitor.v1.GetProductRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetProductRequest(buffer_arg) {
  return monitor_v1_monitor_pb.GetProductRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetProductResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetProductResponse)) {
    throw new Error('Expected argument of type monitor.v1.GetProductResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetProductResponse(buffer_arg) {
  return monitor_v1_monitor_pb.GetProductResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_monitor_v1_GetUrlsRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetUrlsRequest)) {
    throw new Error('Expected argument of type monitor.v1.GetUrlsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetUrlsRequest(buffer_arg) {
  return monitor_v1_monitor_pb.GetUrlsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_GetUrlsResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.GetUrlsResponse)) {
    throw new Error('Expected argument of type monitor.v1.GetUrlsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_GetUrlsResponse(buffer_arg) {
  return monitor_v1_monitor_pb.GetUrlsResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_monitor_v1_RemoveUrlRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.RemoveUrlRequest)) {
    throw new Error('Expected argument of type monitor.v1.RemoveUrlRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_RemoveUrlRequest(buffer_arg) {
  return monitor_v1_monitor_pb.RemoveUrlRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_RemoveUrlResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.RemoveUrlResponse)) {
    throw new Error('Expected argument of type monitor.v1.RemoveUrlResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_RemoveUrlResponse(buffer_arg) {
  return monitor_v1_monitor_pb.RemoveUrlResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_StartMonitorpageRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.StartMonitorpageRequest)) {
    throw new Error('Expected argument of type monitor.v1.StartMonitorpageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_StartMonitorpageRequest(buffer_arg) {
  return monitor_v1_monitor_pb.StartMonitorpageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_StartMonitorpageResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.StartMonitorpageResponse)) {
    throw new Error('Expected argument of type monitor.v1.StartMonitorpageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_StartMonitorpageResponse(buffer_arg) {
  return monitor_v1_monitor_pb.StartMonitorpageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_StopMonitorpageRequest(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.StopMonitorpageRequest)) {
    throw new Error('Expected argument of type monitor.v1.StopMonitorpageRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_StopMonitorpageRequest(buffer_arg) {
  return monitor_v1_monitor_pb.StopMonitorpageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_monitor_v1_StopMonitorpageResponse(arg) {
  if (!(arg instanceof monitor_v1_monitor_pb.StopMonitorpageResponse)) {
    throw new Error('Expected argument of type monitor.v1.StopMonitorpageResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_monitor_v1_StopMonitorpageResponse(buffer_arg) {
  return monitor_v1_monitor_pb.StopMonitorpageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MonitorServiceService = exports.MonitorServiceService = {
  getMonitorpages: {
    path: '/monitor.v1.MonitorService/GetMonitorpages',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.GetMonitorpagesRequest,
    responseType: monitor_v1_monitor_pb.GetMonitorpagesResponse,
    requestSerialize: serialize_monitor_v1_GetMonitorpagesRequest,
    requestDeserialize: deserialize_monitor_v1_GetMonitorpagesRequest,
    responseSerialize: serialize_monitor_v1_GetMonitorpagesResponse,
    responseDeserialize: deserialize_monitor_v1_GetMonitorpagesResponse,
  },
  getMonitorpage: {
    path: '/monitor.v1.MonitorService/GetMonitorpage',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.GetMonitorpageRequest,
    responseType: monitor_v1_monitor_pb.GetMonitorpageResponse,
    requestSerialize: serialize_monitor_v1_GetMonitorpageRequest,
    requestDeserialize: deserialize_monitor_v1_GetMonitorpageRequest,
    responseSerialize: serialize_monitor_v1_GetMonitorpageResponse,
    responseDeserialize: deserialize_monitor_v1_GetMonitorpageResponse,
  },
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
  getProduct: {
    path: '/monitor.v1.MonitorService/GetProduct',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.GetProductRequest,
    responseType: monitor_v1_monitor_pb.GetProductResponse,
    requestSerialize: serialize_monitor_v1_GetProductRequest,
    requestDeserialize: deserialize_monitor_v1_GetProductRequest,
    responseSerialize: serialize_monitor_v1_GetProductResponse,
    responseDeserialize: deserialize_monitor_v1_GetProductResponse,
  },
  activateProductMonitoring: {
    path: '/monitor.v1.MonitorService/ActivateProductMonitoring',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.ActivateProductMonitoringRequest,
    responseType: monitor_v1_monitor_pb.ActivateProductMonitoringResponse,
    requestSerialize: serialize_monitor_v1_ActivateProductMonitoringRequest,
    requestDeserialize: deserialize_monitor_v1_ActivateProductMonitoringRequest,
    responseSerialize: serialize_monitor_v1_ActivateProductMonitoringResponse,
    responseDeserialize: deserialize_monitor_v1_ActivateProductMonitoringResponse,
  },
  disableProductMonitoring: {
    path: '/monitor.v1.MonitorService/DisableProductMonitoring',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.DisableProductMonitoringRequest,
    responseType: monitor_v1_monitor_pb.DisableProductMonitoringResponse,
    requestSerialize: serialize_monitor_v1_DisableProductMonitoringRequest,
    requestDeserialize: deserialize_monitor_v1_DisableProductMonitoringRequest,
    responseSerialize: serialize_monitor_v1_DisableProductMonitoringResponse,
    responseDeserialize: deserialize_monitor_v1_DisableProductMonitoringResponse,
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
  getUrls: {
    path: '/monitor.v1.MonitorService/GetUrls',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.GetUrlsRequest,
    responseType: monitor_v1_monitor_pb.GetUrlsResponse,
    requestSerialize: serialize_monitor_v1_GetUrlsRequest,
    requestDeserialize: deserialize_monitor_v1_GetUrlsRequest,
    responseSerialize: serialize_monitor_v1_GetUrlsResponse,
    responseDeserialize: deserialize_monitor_v1_GetUrlsResponse,
  },
  addUrl: {
    path: '/monitor.v1.MonitorService/AddUrl',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.AddUrlRequest,
    responseType: monitor_v1_monitor_pb.AddUrlResponse,
    requestSerialize: serialize_monitor_v1_AddUrlRequest,
    requestDeserialize: deserialize_monitor_v1_AddUrlRequest,
    responseSerialize: serialize_monitor_v1_AddUrlResponse,
    responseDeserialize: deserialize_monitor_v1_AddUrlResponse,
  },
  removeUrl: {
    path: '/monitor.v1.MonitorService/RemoveUrl',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.RemoveUrlRequest,
    responseType: monitor_v1_monitor_pb.RemoveUrlResponse,
    requestSerialize: serialize_monitor_v1_RemoveUrlRequest,
    requestDeserialize: deserialize_monitor_v1_RemoveUrlRequest,
    responseSerialize: serialize_monitor_v1_RemoveUrlResponse,
    responseDeserialize: deserialize_monitor_v1_RemoveUrlResponse,
  },
  startMonitorpage: {
    path: '/monitor.v1.MonitorService/StartMonitorpage',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.StartMonitorpageRequest,
    responseType: monitor_v1_monitor_pb.StartMonitorpageResponse,
    requestSerialize: serialize_monitor_v1_StartMonitorpageRequest,
    requestDeserialize: deserialize_monitor_v1_StartMonitorpageRequest,
    responseSerialize: serialize_monitor_v1_StartMonitorpageResponse,
    responseDeserialize: deserialize_monitor_v1_StartMonitorpageResponse,
  },
  stopMonitorpage: {
    path: '/monitor.v1.MonitorService/StopMonitorpage',
    requestStream: false,
    responseStream: false,
    requestType: monitor_v1_monitor_pb.StopMonitorpageRequest,
    responseType: monitor_v1_monitor_pb.StopMonitorpageResponse,
    requestSerialize: serialize_monitor_v1_StopMonitorpageRequest,
    requestDeserialize: deserialize_monitor_v1_StopMonitorpageRequest,
    responseSerialize: serialize_monitor_v1_StopMonitorpageResponse,
    responseDeserialize: deserialize_monitor_v1_StopMonitorpageResponse,
  },
};

exports.MonitorServiceClient = grpc.makeGenericClientConstructor(MonitorServiceService);
