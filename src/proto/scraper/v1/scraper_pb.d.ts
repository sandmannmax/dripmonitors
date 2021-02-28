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

export class GetProductsRequest extends jspb.Message { 
    getTechname(): string;
    setTechname(value: string): GetProductsRequest;
    getProxyAddress(): string;
    setProxyAddress(value: string): GetProductsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductsRequest): GetProductsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductsRequest;
    static deserializeBinaryFromReader(message: GetProductsRequest, reader: jspb.BinaryReader): GetProductsRequest;
}

export namespace GetProductsRequest {
    export type AsObject = {
        techname: string,
        proxyAddress: string,
    }
}

export class GetProductsResponse extends jspb.Message { 
    clearProductsList(): void;
    getProductsList(): Array<Product>;
    setProductsList(value: Array<Product>): GetProductsResponse;
    addProducts(value?: Product, index?: number): Product;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductsResponse): GetProductsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductsResponse;
    static deserializeBinaryFromReader(message: GetProductsResponse, reader: jspb.BinaryReader): GetProductsResponse;
}

export namespace GetProductsResponse {
    export type AsObject = {
        productsList: Array<Product.AsObject>,
    }
}

export class Product extends jspb.Message { 
    getId(): string;
    setId(value: string): Product;
    getName(): string;
    setName(value: string): Product;
    getMonitorpageId(): string;
    setMonitorpageId(value: string): Product;
    getHref(): string;
    setHref(value: string): Product;
    getImg(): string;
    setImg(value: string): Product;
    getPrice(): string;
    setPrice(value: string): Product;
    clearSizesList(): void;
    getSizesList(): Array<string>;
    setSizesList(value: Array<string>): Product;
    addSizes(value: string, index?: number): string;
    clearSizesSoldOutList(): void;
    getSizesSoldOutList(): Array<boolean>;
    setSizesSoldOutList(value: Array<boolean>): Product;
    addSizesSoldOut(value: boolean, index?: number): boolean;
    getSoldOut(): boolean;
    setSoldOut(value: boolean): Product;
    getActive(): boolean;
    setActive(value: boolean): Product;
    getHasSizes(): boolean;
    setHasSizes(value: boolean): Product;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Product.AsObject;
    static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Product;
    static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
    export type AsObject = {
        id: string,
        name: string,
        monitorpageId: string,
        href: string,
        img: string,
        price: string,
        sizesList: Array<string>,
        sizesSoldOutList: Array<boolean>,
        soldOut: boolean,
        active: boolean,
        hasSizes: boolean,
    }
}
