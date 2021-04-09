// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var scraper_v1_scraper_pb = require('./scraper_pb.js');

function serialize_scraper_v1_AddProxyRequest(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.AddProxyRequest)) {
    throw new Error('Expected argument of type scraper.v1.AddProxyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_AddProxyRequest(buffer_arg) {
  return scraper_v1_scraper_pb.AddProxyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_AddProxyResponse(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.AddProxyResponse)) {
    throw new Error('Expected argument of type scraper.v1.AddProxyResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_AddProxyResponse(buffer_arg) {
  return scraper_v1_scraper_pb.AddProxyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_GetProxiesRequest(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetProxiesRequest)) {
    throw new Error('Expected argument of type scraper.v1.GetProxiesRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetProxiesRequest(buffer_arg) {
  return scraper_v1_scraper_pb.GetProxiesRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_GetProxiesResponse(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetProxiesResponse)) {
    throw new Error('Expected argument of type scraper.v1.GetProxiesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetProxiesResponse(buffer_arg) {
  return scraper_v1_scraper_pb.GetProxiesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_RemoveProxyRequest(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.RemoveProxyRequest)) {
    throw new Error('Expected argument of type scraper.v1.RemoveProxyRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_RemoveProxyRequest(buffer_arg) {
  return scraper_v1_scraper_pb.RemoveProxyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_ScrapeRequest(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.ScrapeRequest)) {
    throw new Error('Expected argument of type scraper.v1.ScrapeRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_ScrapeRequest(buffer_arg) {
  return scraper_v1_scraper_pb.ScrapeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_ScrapeResponse(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.ScrapeResponse)) {
    throw new Error('Expected argument of type scraper.v1.ScrapeResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_ScrapeResponse(buffer_arg) {
  return scraper_v1_scraper_pb.ScrapeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ScraperServiceService = exports.ScraperServiceService = {
  scrape: {
    path: '/scraper.v1.ScraperService/Scrape',
    requestStream: false,
    responseStream: false,
    requestType: scraper_v1_scraper_pb.ScrapeRequest,
    responseType: scraper_v1_scraper_pb.ScrapeResponse,
    requestSerialize: serialize_scraper_v1_ScrapeRequest,
    requestDeserialize: deserialize_scraper_v1_ScrapeRequest,
    responseSerialize: serialize_scraper_v1_ScrapeResponse,
    responseDeserialize: deserialize_scraper_v1_ScrapeResponse,
  },
  getProxies: {
    path: '/scraper.v1.ScraperService/GetProxies',
    requestStream: false,
    responseStream: false,
    requestType: scraper_v1_scraper_pb.GetProxiesRequest,
    responseType: scraper_v1_scraper_pb.GetProxiesResponse,
    requestSerialize: serialize_scraper_v1_GetProxiesRequest,
    requestDeserialize: deserialize_scraper_v1_GetProxiesRequest,
    responseSerialize: serialize_scraper_v1_GetProxiesResponse,
    responseDeserialize: deserialize_scraper_v1_GetProxiesResponse,
  },
  addProxy: {
    path: '/scraper.v1.ScraperService/AddProxy',
    requestStream: false,
    responseStream: false,
    requestType: scraper_v1_scraper_pb.AddProxyRequest,
    responseType: scraper_v1_scraper_pb.AddProxyResponse,
    requestSerialize: serialize_scraper_v1_AddProxyRequest,
    requestDeserialize: deserialize_scraper_v1_AddProxyRequest,
    responseSerialize: serialize_scraper_v1_AddProxyResponse,
    responseDeserialize: deserialize_scraper_v1_AddProxyResponse,
  },
  removeProxy: {
    path: '/scraper.v1.ScraperService/RemoveProxy',
    requestStream: false,
    responseStream: false,
    requestType: scraper_v1_scraper_pb.RemoveProxyRequest,
    responseType: scraper_v1_scraper_pb.RemoveProxyRequest,
    requestSerialize: serialize_scraper_v1_RemoveProxyRequest,
    requestDeserialize: deserialize_scraper_v1_RemoveProxyRequest,
    responseSerialize: serialize_scraper_v1_RemoveProxyRequest,
    responseDeserialize: deserialize_scraper_v1_RemoveProxyRequest,
  },
};

exports.ScraperServiceClient = grpc.makeGenericClientConstructor(ScraperServiceService);
