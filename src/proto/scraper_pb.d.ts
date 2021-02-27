// package: scraper.v1
// file: scraper/v1/scraper.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetHtmlRequest extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): GetHtmlRequest;
    getProxyAddress(): string;
    setProxyAddress(value: string): GetHtmlRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHtmlRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetHtmlRequest): GetHtmlRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHtmlRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHtmlRequest;
    static deserializeBinaryFromReader(message: GetHtmlRequest, reader: jspb.BinaryReader): GetHtmlRequest;
}

export namespace GetHtmlRequest {
    export type AsObject = {
        url: string,
        proxyAddress: string,
    }
}

export class GetHtmlResponse extends jspb.Message { 
    getHtml(): string;
    setHtml(value: string): GetHtmlResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetHtmlResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetHtmlResponse): GetHtmlResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetHtmlResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetHtmlResponse;
    static deserializeBinaryFromReader(message: GetHtmlResponse, reader: jspb.BinaryReader): GetHtmlResponse;
}

export namespace GetHtmlResponse {
    export type AsObject = {
        html: string,
    }
}
