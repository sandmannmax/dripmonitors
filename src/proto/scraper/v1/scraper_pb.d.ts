// package: scraper.v1
// file: scraper/v1/scraper.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Proxy extends jspb.Message { 
    getProxyUuid(): string;
    setProxyUuid(value: string): Proxy;
    getAddress(): string;
    setAddress(value: string): Proxy;
    getCc(): string;
    setCc(value: string): Proxy;
    getProvider(): string;
    setProvider(value: string): Proxy;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Proxy.AsObject;
    static toObject(includeInstance: boolean, msg: Proxy): Proxy.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Proxy, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Proxy;
    static deserializeBinaryFromReader(message: Proxy, reader: jspb.BinaryReader): Proxy;
}

export namespace Proxy {
    export type AsObject = {
        proxyUuid: string,
        address: string,
        cc: string,
        provider: string,
    }
}

export class ScrapeRequest extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): ScrapeRequest;
    getCc(): string;
    setCc(value: string): ScrapeRequest;
    getJsRendering(): boolean;
    setJsRendering(value: boolean): ScrapeRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScrapeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ScrapeRequest): ScrapeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScrapeRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScrapeRequest;
    static deserializeBinaryFromReader(message: ScrapeRequest, reader: jspb.BinaryReader): ScrapeRequest;
}

export namespace ScrapeRequest {
    export type AsObject = {
        url: string,
        cc: string,
        jsRendering: boolean,
    }
}

export class ScrapeResponse extends jspb.Message { 
    getStatusCode(): number;
    setStatusCode(value: number): ScrapeResponse;
    getProxyError(): boolean;
    setProxyError(value: boolean): ScrapeResponse;
    getContent(): string;
    setContent(value: string): ScrapeResponse;
    getError(): string;
    setError(value: string): ScrapeResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ScrapeResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ScrapeResponse): ScrapeResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ScrapeResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ScrapeResponse;
    static deserializeBinaryFromReader(message: ScrapeResponse, reader: jspb.BinaryReader): ScrapeResponse;
}

export namespace ScrapeResponse {
    export type AsObject = {
        statusCode: number,
        proxyError: boolean,
        content: string,
        error: string,
    }
}

export class GetProxiesRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProxiesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetProxiesRequest): GetProxiesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProxiesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProxiesRequest;
    static deserializeBinaryFromReader(message: GetProxiesRequest, reader: jspb.BinaryReader): GetProxiesRequest;
}

export namespace GetProxiesRequest {
    export type AsObject = {
    }
}

export class GetProxiesResponse extends jspb.Message { 
    clearProxiesList(): void;
    getProxiesList(): Array<Proxy>;
    setProxiesList(value: Array<Proxy>): GetProxiesResponse;
    addProxies(value?: Proxy, index?: number): Proxy;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProxiesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetProxiesResponse): GetProxiesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProxiesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProxiesResponse;
    static deserializeBinaryFromReader(message: GetProxiesResponse, reader: jspb.BinaryReader): GetProxiesResponse;
}

export namespace GetProxiesResponse {
    export type AsObject = {
        proxiesList: Array<Proxy.AsObject>,
    }
}

export class AddProxyRequest extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): AddProxyRequest;
    getCc(): string;
    setCc(value: string): AddProxyRequest;
    getProvider(): string;
    setProvider(value: string): AddProxyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddProxyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddProxyRequest): AddProxyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddProxyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddProxyRequest;
    static deserializeBinaryFromReader(message: AddProxyRequest, reader: jspb.BinaryReader): AddProxyRequest;
}

export namespace AddProxyRequest {
    export type AsObject = {
        address: string,
        cc: string,
        provider: string,
    }
}

export class AddProxyResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddProxyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddProxyResponse): AddProxyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddProxyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddProxyResponse;
    static deserializeBinaryFromReader(message: AddProxyResponse, reader: jspb.BinaryReader): AddProxyResponse;
}

export namespace AddProxyResponse {
    export type AsObject = {
    }
}

export class RemoveProxyRequest extends jspb.Message { 
    getProxyUuid(): string;
    setProxyUuid(value: string): RemoveProxyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveProxyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveProxyRequest): RemoveProxyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveProxyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveProxyRequest;
    static deserializeBinaryFromReader(message: RemoveProxyRequest, reader: jspb.BinaryReader): RemoveProxyRequest;
}

export namespace RemoveProxyRequest {
    export type AsObject = {
        proxyUuid: string,
    }
}

export class RemoveProxyResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveProxyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveProxyResponse): RemoveProxyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveProxyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveProxyResponse;
    static deserializeBinaryFromReader(message: RemoveProxyResponse, reader: jspb.BinaryReader): RemoveProxyResponse;
}

export namespace RemoveProxyResponse {
    export type AsObject = {
    }
}
