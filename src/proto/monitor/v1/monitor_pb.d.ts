// package: monitor.v1
// file: monitor/v1/monitor.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Monitorpage extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): Monitorpage;
    getMonitorpageName(): string;
    setMonitorpageName(value: string): Monitorpage;
    getMonitorpageDisplayName(): string;
    setMonitorpageDisplayName(value: string): Monitorpage;
    getIntervalTime(): number;
    setIntervalTime(value: number): Monitorpage;
    clearFiltersList(): void;
    getFiltersList(): Array<Filter>;
    setFiltersList(value: Array<Filter>): Monitorpage;
    addFilters(value?: Filter, index?: number): Filter;
    clearUrlsList(): void;
    getUrlsList(): Array<Url>;
    setUrlsList(value: Array<Url>): Monitorpage;
    addUrls(value?: Url, index?: number): Url;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Monitorpage.AsObject;
    static toObject(includeInstance: boolean, msg: Monitorpage): Monitorpage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Monitorpage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Monitorpage;
    static deserializeBinaryFromReader(message: Monitorpage, reader: jspb.BinaryReader): Monitorpage;
}

export namespace Monitorpage {
    export type AsObject = {
        monitorpageUuid: string,
        monitorpageName: string,
        monitorpageDisplayName: string,
        intervalTime: number,
        filtersList: Array<Filter.AsObject>,
        urlsList: Array<Url.AsObject>,
    }
}

export class Product extends jspb.Message { 
    getProductUuid(): string;
    setProductUuid(value: string): Product;
    getProductPageId(): string;
    setProductPageId(value: string): Product;
    getName(): string;
    setName(value: string): Product;
    getHref(): string;
    setHref(value: string): Product;
    getImg(): string;
    setImg(value: string): Product;
    getMonitored(): boolean;
    setMonitored(value: boolean): Product;

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
        productUuid: string,
        productPageId: string,
        name: string,
        href: string,
        img: string,
        monitored: boolean,
    }
}

export class Filter extends jspb.Message { 
    getValue(): string;
    setValue(value: string): Filter;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Filter.AsObject;
    static toObject(includeInstance: boolean, msg: Filter): Filter.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Filter, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Filter;
    static deserializeBinaryFromReader(message: Filter, reader: jspb.BinaryReader): Filter;
}

export namespace Filter {
    export type AsObject = {
        value: string,
    }
}

export class Url extends jspb.Message { 
    getValue(): string;
    setValue(value: string): Url;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Url.AsObject;
    static toObject(includeInstance: boolean, msg: Url): Url.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Url, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Url;
    static deserializeBinaryFromReader(message: Url, reader: jspb.BinaryReader): Url;
}

export namespace Url {
    export type AsObject = {
        value: string,
    }
}

export class GetMonitorpagesRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMonitorpagesRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMonitorpagesRequest): GetMonitorpagesRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMonitorpagesRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMonitorpagesRequest;
    static deserializeBinaryFromReader(message: GetMonitorpagesRequest, reader: jspb.BinaryReader): GetMonitorpagesRequest;
}

export namespace GetMonitorpagesRequest {
    export type AsObject = {
    }
}

export class GetMonitorpagesResponse extends jspb.Message { 
    clearMonitorpagesList(): void;
    getMonitorpagesList(): Array<Monitorpage>;
    setMonitorpagesList(value: Array<Monitorpage>): GetMonitorpagesResponse;
    addMonitorpages(value?: Monitorpage, index?: number): Monitorpage;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMonitorpagesResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMonitorpagesResponse): GetMonitorpagesResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMonitorpagesResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMonitorpagesResponse;
    static deserializeBinaryFromReader(message: GetMonitorpagesResponse, reader: jspb.BinaryReader): GetMonitorpagesResponse;
}

export namespace GetMonitorpagesResponse {
    export type AsObject = {
        monitorpagesList: Array<Monitorpage.AsObject>,
    }
}

export class GetMonitorpageRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): GetMonitorpageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMonitorpageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetMonitorpageRequest): GetMonitorpageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMonitorpageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMonitorpageRequest;
    static deserializeBinaryFromReader(message: GetMonitorpageRequest, reader: jspb.BinaryReader): GetMonitorpageRequest;
}

export namespace GetMonitorpageRequest {
    export type AsObject = {
        monitorpageUuid: string,
    }
}

export class GetMonitorpageResponse extends jspb.Message { 

    hasMonitorpage(): boolean;
    clearMonitorpage(): void;
    getMonitorpage(): Monitorpage | undefined;
    setMonitorpage(value?: Monitorpage): GetMonitorpageResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetMonitorpageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetMonitorpageResponse): GetMonitorpageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetMonitorpageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetMonitorpageResponse;
    static deserializeBinaryFromReader(message: GetMonitorpageResponse, reader: jspb.BinaryReader): GetMonitorpageResponse;
}

export namespace GetMonitorpageResponse {
    export type AsObject = {
        monitorpage?: Monitorpage.AsObject,
    }
}

export class GetProductsRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): GetProductsRequest;

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
        monitorpageUuid: string,
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

export class GetProductRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): GetProductRequest;
    getProductUuid(): string;
    setProductUuid(value: string): GetProductRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductRequest): GetProductRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductRequest;
    static deserializeBinaryFromReader(message: GetProductRequest, reader: jspb.BinaryReader): GetProductRequest;
}

export namespace GetProductRequest {
    export type AsObject = {
        monitorpageUuid: string,
        productUuid: string,
    }
}

export class GetProductResponse extends jspb.Message { 

    hasProduct(): boolean;
    clearProduct(): void;
    getProduct(): Product | undefined;
    setProduct(value?: Product): GetProductResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetProductResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetProductResponse): GetProductResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetProductResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetProductResponse;
    static deserializeBinaryFromReader(message: GetProductResponse, reader: jspb.BinaryReader): GetProductResponse;
}

export namespace GetProductResponse {
    export type AsObject = {
        product?: Product.AsObject,
    }
}

export class ActivateProductMonitoringRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): ActivateProductMonitoringRequest;
    getProductUuid(): string;
    setProductUuid(value: string): ActivateProductMonitoringRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ActivateProductMonitoringRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ActivateProductMonitoringRequest): ActivateProductMonitoringRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ActivateProductMonitoringRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ActivateProductMonitoringRequest;
    static deserializeBinaryFromReader(message: ActivateProductMonitoringRequest, reader: jspb.BinaryReader): ActivateProductMonitoringRequest;
}

export namespace ActivateProductMonitoringRequest {
    export type AsObject = {
        monitorpageUuid: string,
        productUuid: string,
    }
}

export class ActivateProductMonitoringResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ActivateProductMonitoringResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ActivateProductMonitoringResponse): ActivateProductMonitoringResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ActivateProductMonitoringResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ActivateProductMonitoringResponse;
    static deserializeBinaryFromReader(message: ActivateProductMonitoringResponse, reader: jspb.BinaryReader): ActivateProductMonitoringResponse;
}

export namespace ActivateProductMonitoringResponse {
    export type AsObject = {
    }
}

export class DisableProductMonitoringRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): DisableProductMonitoringRequest;
    getProductUuid(): string;
    setProductUuid(value: string): DisableProductMonitoringRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisableProductMonitoringRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DisableProductMonitoringRequest): DisableProductMonitoringRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisableProductMonitoringRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisableProductMonitoringRequest;
    static deserializeBinaryFromReader(message: DisableProductMonitoringRequest, reader: jspb.BinaryReader): DisableProductMonitoringRequest;
}

export namespace DisableProductMonitoringRequest {
    export type AsObject = {
        monitorpageUuid: string,
        productUuid: string,
    }
}

export class DisableProductMonitoringResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DisableProductMonitoringResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DisableProductMonitoringResponse): DisableProductMonitoringResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DisableProductMonitoringResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DisableProductMonitoringResponse;
    static deserializeBinaryFromReader(message: DisableProductMonitoringResponse, reader: jspb.BinaryReader): DisableProductMonitoringResponse;
}

export namespace DisableProductMonitoringResponse {
    export type AsObject = {
    }
}

export class GetFiltersRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): GetFiltersRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFiltersRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetFiltersRequest): GetFiltersRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFiltersRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFiltersRequest;
    static deserializeBinaryFromReader(message: GetFiltersRequest, reader: jspb.BinaryReader): GetFiltersRequest;
}

export namespace GetFiltersRequest {
    export type AsObject = {
        monitorpageUuid: string,
    }
}

export class GetFiltersResponse extends jspb.Message { 
    clearFiltersList(): void;
    getFiltersList(): Array<Filter>;
    setFiltersList(value: Array<Filter>): GetFiltersResponse;
    addFilters(value?: Filter, index?: number): Filter;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetFiltersResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetFiltersResponse): GetFiltersResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetFiltersResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetFiltersResponse;
    static deserializeBinaryFromReader(message: GetFiltersResponse, reader: jspb.BinaryReader): GetFiltersResponse;
}

export namespace GetFiltersResponse {
    export type AsObject = {
        filtersList: Array<Filter.AsObject>,
    }
}

export class AddFilterRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): AddFilterRequest;
    getValue(): string;
    setValue(value: string): AddFilterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddFilterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddFilterRequest): AddFilterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddFilterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddFilterRequest;
    static deserializeBinaryFromReader(message: AddFilterRequest, reader: jspb.BinaryReader): AddFilterRequest;
}

export namespace AddFilterRequest {
    export type AsObject = {
        monitorpageUuid: string,
        value: string,
    }
}

export class AddFilterResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddFilterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddFilterResponse): AddFilterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddFilterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddFilterResponse;
    static deserializeBinaryFromReader(message: AddFilterResponse, reader: jspb.BinaryReader): AddFilterResponse;
}

export namespace AddFilterResponse {
    export type AsObject = {
    }
}

export class RemoveFilterRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): RemoveFilterRequest;
    getValue(): string;
    setValue(value: string): RemoveFilterRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveFilterRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveFilterRequest): RemoveFilterRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveFilterRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveFilterRequest;
    static deserializeBinaryFromReader(message: RemoveFilterRequest, reader: jspb.BinaryReader): RemoveFilterRequest;
}

export namespace RemoveFilterRequest {
    export type AsObject = {
        monitorpageUuid: string,
        value: string,
    }
}

export class RemoveFilterResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveFilterResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveFilterResponse): RemoveFilterResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveFilterResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveFilterResponse;
    static deserializeBinaryFromReader(message: RemoveFilterResponse, reader: jspb.BinaryReader): RemoveFilterResponse;
}

export namespace RemoveFilterResponse {
    export type AsObject = {
    }
}

export class GetUrlsRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): GetUrlsRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUrlsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetUrlsRequest): GetUrlsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUrlsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUrlsRequest;
    static deserializeBinaryFromReader(message: GetUrlsRequest, reader: jspb.BinaryReader): GetUrlsRequest;
}

export namespace GetUrlsRequest {
    export type AsObject = {
        monitorpageUuid: string,
    }
}

export class GetUrlsResponse extends jspb.Message { 
    clearUrlsList(): void;
    getUrlsList(): Array<Url>;
    setUrlsList(value: Array<Url>): GetUrlsResponse;
    addUrls(value?: Url, index?: number): Url;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUrlsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUrlsResponse): GetUrlsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUrlsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUrlsResponse;
    static deserializeBinaryFromReader(message: GetUrlsResponse, reader: jspb.BinaryReader): GetUrlsResponse;
}

export namespace GetUrlsResponse {
    export type AsObject = {
        urlsList: Array<Url.AsObject>,
    }
}

export class AddUrlRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): AddUrlRequest;
    getValue(): string;
    setValue(value: string): AddUrlRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddUrlRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddUrlRequest): AddUrlRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddUrlRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddUrlRequest;
    static deserializeBinaryFromReader(message: AddUrlRequest, reader: jspb.BinaryReader): AddUrlRequest;
}

export namespace AddUrlRequest {
    export type AsObject = {
        monitorpageUuid: string,
        value: string,
    }
}

export class AddUrlResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddUrlResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddUrlResponse): AddUrlResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddUrlResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddUrlResponse;
    static deserializeBinaryFromReader(message: AddUrlResponse, reader: jspb.BinaryReader): AddUrlResponse;
}

export namespace AddUrlResponse {
    export type AsObject = {
    }
}

export class RemoveUrlRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): RemoveUrlRequest;
    getValue(): string;
    setValue(value: string): RemoveUrlRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveUrlRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveUrlRequest): RemoveUrlRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveUrlRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveUrlRequest;
    static deserializeBinaryFromReader(message: RemoveUrlRequest, reader: jspb.BinaryReader): RemoveUrlRequest;
}

export namespace RemoveUrlRequest {
    export type AsObject = {
        monitorpageUuid: string,
        value: string,
    }
}

export class RemoveUrlResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveUrlResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveUrlResponse): RemoveUrlResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveUrlResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveUrlResponse;
    static deserializeBinaryFromReader(message: RemoveUrlResponse, reader: jspb.BinaryReader): RemoveUrlResponse;
}

export namespace RemoveUrlResponse {
    export type AsObject = {
    }
}

export class StartMonitorpageRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): StartMonitorpageRequest;
    getIntervalTime(): number;
    setIntervalTime(value: number): StartMonitorpageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StartMonitorpageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StartMonitorpageRequest): StartMonitorpageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StartMonitorpageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StartMonitorpageRequest;
    static deserializeBinaryFromReader(message: StartMonitorpageRequest, reader: jspb.BinaryReader): StartMonitorpageRequest;
}

export namespace StartMonitorpageRequest {
    export type AsObject = {
        monitorpageUuid: string,
        intervalTime: number,
    }
}

export class StartMonitorpageResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StartMonitorpageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StartMonitorpageResponse): StartMonitorpageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StartMonitorpageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StartMonitorpageResponse;
    static deserializeBinaryFromReader(message: StartMonitorpageResponse, reader: jspb.BinaryReader): StartMonitorpageResponse;
}

export namespace StartMonitorpageResponse {
    export type AsObject = {
    }
}

export class StopMonitorpageRequest extends jspb.Message { 
    getMonitorpageUuid(): string;
    setMonitorpageUuid(value: string): StopMonitorpageRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StopMonitorpageRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StopMonitorpageRequest): StopMonitorpageRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StopMonitorpageRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StopMonitorpageRequest;
    static deserializeBinaryFromReader(message: StopMonitorpageRequest, reader: jspb.BinaryReader): StopMonitorpageRequest;
}

export namespace StopMonitorpageRequest {
    export type AsObject = {
        monitorpageUuid: string,
    }
}

export class StopMonitorpageResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StopMonitorpageResponse.AsObject;
    static toObject(includeInstance: boolean, msg: StopMonitorpageResponse): StopMonitorpageResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StopMonitorpageResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StopMonitorpageResponse;
    static deserializeBinaryFromReader(message: StopMonitorpageResponse, reader: jspb.BinaryReader): StopMonitorpageResponse;
}

export namespace StopMonitorpageResponse {
    export type AsObject = {
    }
}
