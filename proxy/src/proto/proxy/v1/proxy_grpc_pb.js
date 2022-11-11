// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var proxy_v1_proxy_pb = require('../../proxy/v1/proxy_pb.js');

function serialize_proxy_v1_CreateProxyRequest(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.CreateProxyRequest)) {
    throw new Error('Expected argument of type proxy.v1.CreateProxyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_CreateProxyRequest(buffer_arg) {
  return proxy_v1_proxy_pb.CreateProxyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_CreateProxyResponse(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.CreateProxyResponse)) {
    throw new Error('Expected argument of type proxy.v1.CreateProxyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_CreateProxyResponse(buffer_arg) {
  return proxy_v1_proxy_pb.CreateProxyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_DeleteProxyRequest(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.DeleteProxyRequest)) {
    throw new Error('Expected argument of type proxy.v1.DeleteProxyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_DeleteProxyRequest(buffer_arg) {
  return proxy_v1_proxy_pb.DeleteProxyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_DeleteProxyResponse(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.DeleteProxyResponse)) {
    throw new Error('Expected argument of type proxy.v1.DeleteProxyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_DeleteProxyResponse(buffer_arg) {
  return proxy_v1_proxy_pb.DeleteProxyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_GetProxiesRequest(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.GetProxiesRequest)) {
    throw new Error('Expected argument of type proxy.v1.GetProxiesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_GetProxiesRequest(buffer_arg) {
  return proxy_v1_proxy_pb.GetProxiesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_GetProxiesResponse(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.GetProxiesResponse)) {
    throw new Error('Expected argument of type proxy.v1.GetProxiesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_GetProxiesResponse(buffer_arg) {
  return proxy_v1_proxy_pb.GetProxiesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_GetRandomProxyRequest(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.GetRandomProxyRequest)) {
    throw new Error('Expected argument of type proxy.v1.GetRandomProxyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_GetRandomProxyRequest(buffer_arg) {
  return proxy_v1_proxy_pb.GetRandomProxyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_GetRandomProxyResponse(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.GetRandomProxyResponse)) {
    throw new Error('Expected argument of type proxy.v1.GetRandomProxyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_GetRandomProxyResponse(buffer_arg) {
  return proxy_v1_proxy_pb.GetRandomProxyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_ResetCooldownRequest(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.ResetCooldownRequest)) {
    throw new Error('Expected argument of type proxy.v1.ResetCooldownRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_ResetCooldownRequest(buffer_arg) {
  return proxy_v1_proxy_pb.ResetCooldownRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_ResetCooldownResponse(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.ResetCooldownResponse)) {
    throw new Error('Expected argument of type proxy.v1.ResetCooldownResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_ResetCooldownResponse(buffer_arg) {
  return proxy_v1_proxy_pb.ResetCooldownResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_SetCooldownRequest(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.SetCooldownRequest)) {
    throw new Error('Expected argument of type proxy.v1.SetCooldownRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_SetCooldownRequest(buffer_arg) {
  return proxy_v1_proxy_pb.SetCooldownRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proxy_v1_SetCooldownResponse(arg) {
  if (!(arg instanceof proxy_v1_proxy_pb.SetCooldownResponse)) {
    throw new Error('Expected argument of type proxy.v1.SetCooldownResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proxy_v1_SetCooldownResponse(buffer_arg) {
  return proxy_v1_proxy_pb.SetCooldownResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProxyServiceService = exports.ProxyServiceService = {
  getProxies: {
    path: '/proxy.v1.ProxyService/GetProxies',
    requestStream: false,
    responseStream: false,
    requestType: proxy_v1_proxy_pb.GetProxiesRequest,
    responseType: proxy_v1_proxy_pb.GetProxiesResponse,
    requestSerialize: serialize_proxy_v1_GetProxiesRequest,
    requestDeserialize: deserialize_proxy_v1_GetProxiesRequest,
    responseSerialize: serialize_proxy_v1_GetProxiesResponse,
    responseDeserialize: deserialize_proxy_v1_GetProxiesResponse,
  },
  createProxy: {
    path: '/proxy.v1.ProxyService/CreateProxy',
    requestStream: false,
    responseStream: false,
    requestType: proxy_v1_proxy_pb.CreateProxyRequest,
    responseType: proxy_v1_proxy_pb.CreateProxyResponse,
    requestSerialize: serialize_proxy_v1_CreateProxyRequest,
    requestDeserialize: deserialize_proxy_v1_CreateProxyRequest,
    responseSerialize: serialize_proxy_v1_CreateProxyResponse,
    responseDeserialize: deserialize_proxy_v1_CreateProxyResponse,
  },
  deleteProxy: {
    path: '/proxy.v1.ProxyService/DeleteProxy',
    requestStream: false,
    responseStream: false,
    requestType: proxy_v1_proxy_pb.DeleteProxyRequest,
    responseType: proxy_v1_proxy_pb.DeleteProxyResponse,
    requestSerialize: serialize_proxy_v1_DeleteProxyRequest,
    requestDeserialize: deserialize_proxy_v1_DeleteProxyRequest,
    responseSerialize: serialize_proxy_v1_DeleteProxyResponse,
    responseDeserialize: deserialize_proxy_v1_DeleteProxyResponse,
  },
  getRandomProxy: {
    path: '/proxy.v1.ProxyService/GetRandomProxy',
    requestStream: false,
    responseStream: false,
    requestType: proxy_v1_proxy_pb.GetRandomProxyRequest,
    responseType: proxy_v1_proxy_pb.GetRandomProxyResponse,
    requestSerialize: serialize_proxy_v1_GetRandomProxyRequest,
    requestDeserialize: deserialize_proxy_v1_GetRandomProxyRequest,
    responseSerialize: serialize_proxy_v1_GetRandomProxyResponse,
    responseDeserialize: deserialize_proxy_v1_GetRandomProxyResponse,
  },
  setCooldown: {
    path: '/proxy.v1.ProxyService/SetCooldown',
    requestStream: false,
    responseStream: false,
    requestType: proxy_v1_proxy_pb.SetCooldownRequest,
    responseType: proxy_v1_proxy_pb.SetCooldownResponse,
    requestSerialize: serialize_proxy_v1_SetCooldownRequest,
    requestDeserialize: deserialize_proxy_v1_SetCooldownRequest,
    responseSerialize: serialize_proxy_v1_SetCooldownResponse,
    responseDeserialize: deserialize_proxy_v1_SetCooldownResponse,
  },
  resetCooldown: {
    path: '/proxy.v1.ProxyService/ResetCooldown',
    requestStream: false,
    responseStream: false,
    requestType: proxy_v1_proxy_pb.ResetCooldownRequest,
    responseType: proxy_v1_proxy_pb.ResetCooldownResponse,
    requestSerialize: serialize_proxy_v1_ResetCooldownRequest,
    requestDeserialize: deserialize_proxy_v1_ResetCooldownRequest,
    responseSerialize: serialize_proxy_v1_ResetCooldownResponse,
    responseDeserialize: deserialize_proxy_v1_ResetCooldownResponse,
  },
};

exports.ProxyServiceClient = grpc.makeGenericClientConstructor(ProxyServiceService);
