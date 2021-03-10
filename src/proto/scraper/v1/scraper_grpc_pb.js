// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var scraper_v1_scraper_pb = require('../../scraper/v1/scraper_pb.js');

function serialize_scraper_v1_GetRequest(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetRequest)) {
    throw new Error('Expected argument of type scraper.v1.GetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetRequest(buffer_arg) {
  return scraper_v1_scraper_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_scraper_v1_GetResponse(arg) {
  if (!(arg instanceof scraper_v1_scraper_pb.GetResponse)) {
    throw new Error('Expected argument of type scraper.v1.GetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_scraper_v1_GetResponse(buffer_arg) {
  return scraper_v1_scraper_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ScraperServiceService = exports.ScraperServiceService = {
  get: {
    path: '/scraper.v1.ScraperService/Get',
    requestStream: false,
    responseStream: false,
    requestType: scraper_v1_scraper_pb.GetRequest,
    responseType: scraper_v1_scraper_pb.GetResponse,
    requestSerialize: serialize_scraper_v1_GetRequest,
    requestDeserialize: deserialize_scraper_v1_GetRequest,
    responseSerialize: serialize_scraper_v1_GetResponse,
    responseDeserialize: deserialize_scraper_v1_GetResponse,
  },
};

exports.ScraperServiceClient = grpc.makeGenericClientConstructor(ScraperServiceService);
