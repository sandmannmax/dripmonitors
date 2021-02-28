// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var scraper_v1_scraper_pb = require('../../scraper/v1/scraper_pb.js');

function serialize_scraper_v1_GetHtmlRequest(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetHtmlRequest)) {
    throw new Error('Expected argument of type scraper.v1.GetHtmlRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetHtmlRequest(buffer_arg) {
  return scraper_v1_scraper_pb.GetHtmlRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_GetHtmlResponse(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetHtmlResponse)) {
    throw new Error('Expected argument of type scraper.v1.GetHtmlResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetHtmlResponse(buffer_arg) {
  return scraper_v1_scraper_pb.GetHtmlResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_GetProductsRequest(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetProductsRequest)) {
    throw new Error('Expected argument of type scraper.v1.GetProductsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetProductsRequest(buffer_arg) {
  return scraper_v1_scraper_pb.GetProductsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_GetProductsResponse(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetProductsResponse)) {
    throw new Error('Expected argument of type scraper.v1.GetProductsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetProductsResponse(buffer_arg) {
  return scraper_v1_scraper_pb.GetProductsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ScraperServiceService = exports.ScraperServiceService = {
  getHtml: {
    path: '/scraper.v1.ScraperService/GetHtml',
    requestStream: false,
    responseStream: false,
    requestType: scraper_v1_scraper_pb.GetHtmlRequest,
    responseType: scraper_v1_scraper_pb.GetHtmlResponse,
    requestSerialize: serialize_scraper_v1_GetHtmlRequest,
    requestDeserialize: deserialize_scraper_v1_GetHtmlRequest,
    responseSerialize: serialize_scraper_v1_GetHtmlResponse,
    responseDeserialize: deserialize_scraper_v1_GetHtmlResponse,
  },
  getProducts: {
    path: '/scraper.v1.ScraperService/GetProducts',
    requestStream: false,
    responseStream: false,
    requestType: scraper_v1_scraper_pb.GetProductsRequest,
    responseType: scraper_v1_scraper_pb.GetProductsResponse,
    requestSerialize: serialize_scraper_v1_GetProductsRequest,
    requestDeserialize: deserialize_scraper_v1_GetProductsRequest,
    responseSerialize: serialize_scraper_v1_GetProductsResponse,
    responseDeserialize: deserialize_scraper_v1_GetProductsResponse,
  },
};

exports.ScraperServiceClient = grpc.makeGenericClientConstructor(ScraperServiceService);
