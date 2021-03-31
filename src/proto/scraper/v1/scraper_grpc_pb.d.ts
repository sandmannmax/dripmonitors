// package: scraper.v1
// file: scraper/v1/scraper.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as scraper_v1_scraper_pb from "../../scraper/v1/scraper_pb";

interface IScraperServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    get: IScraperServiceService_IGet;
}

interface IScraperServiceService_IGet extends grpc.MethodDefinition<scraper_v1_scraper_pb.GetRequest, scraper_v1_scraper_pb.GetResponse> {
    path: "/scraper.v1.ScraperService/Get";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<scraper_v1_scraper_pb.GetRequest>;
    requestDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetRequest>;
    responseSerialize: grpc.serialize<scraper_v1_scraper_pb.GetResponse>;
    responseDeserialize: grpc.deserialize<scraper_v1_scraper_pb.GetResponse>;
}

export const ScraperServiceService: IScraperServiceService;

export interface IScraperServiceServer extends grpc.UntypedServiceImplementation {
    get: grpc.handleUnaryCall<scraper_v1_scraper_pb.GetRequest, scraper_v1_scraper_pb.GetResponse>;
}

export interface IScraperServiceClient {
    get(request: scraper_v1_scraper_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: scraper_v1_scraper_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetResponse) => void): grpc.ClientUnaryCall;
    get(request: scraper_v1_scraper_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetResponse) => void): grpc.ClientUnaryCall;
}

export class ScraperServiceClient extends grpc.Client implements IScraperServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public get(request: scraper_v1_scraper_pb.GetRequest, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: scraper_v1_scraper_pb.GetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetResponse) => void): grpc.ClientUnaryCall;
    public get(request: scraper_v1_scraper_pb.GetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: scraper_v1_scraper_pb.GetResponse) => void): grpc.ClientUnaryCall;
}
