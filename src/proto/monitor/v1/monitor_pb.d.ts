// package: monitor.v1
// file: monitor/v1/monitor.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetProductsRequest extends jspb.Message { 
    getMonitorpageName(): string;
    setMonitorpageName(value: string): GetProductsRequest;

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
        monitorpageName: string,
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
        id: string,
        name: string,
        href: string,
        img: string,
        monitored: boolean,
    }
}

export class AddMonitoredProductRequest extends jspb.Message { 
    getMonitorpageName(): string;
    setMonitorpageName(value: string): AddMonitoredProductRequest;
    getId(): string;
    setId(value: string): AddMonitoredProductRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddMonitoredProductRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddMonitoredProductRequest): AddMonitoredProductRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddMonitoredProductRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddMonitoredProductRequest;
    static deserializeBinaryFromReader(message: AddMonitoredProductRequest, reader: jspb.BinaryReader): AddMonitoredProductRequest;
}

export namespace AddMonitoredProductRequest {
    export type AsObject = {
        monitorpageName: string,
        id: string,
    }
}

export class AddMonitoredProductResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddMonitoredProductResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddMonitoredProductResponse): AddMonitoredProductResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddMonitoredProductResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddMonitoredProductResponse;
    static deserializeBinaryFromReader(message: AddMonitoredProductResponse, reader: jspb.BinaryReader): AddMonitoredProductResponse;
}

export namespace AddMonitoredProductResponse {
    export type AsObject = {
    }
}

export class RemoveMonitoredProductRequest extends jspb.Message { 
    getMonitorpageName(): string;
    setMonitorpageName(value: string): RemoveMonitoredProductRequest;
    getId(): string;
    setId(value: string): RemoveMonitoredProductRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveMonitoredProductRequest.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveMonitoredProductRequest): RemoveMonitoredProductRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveMonitoredProductRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveMonitoredProductRequest;
    static deserializeBinaryFromReader(message: RemoveMonitoredProductRequest, reader: jspb.BinaryReader): RemoveMonitoredProductRequest;
}

export namespace RemoveMonitoredProductRequest {
    export type AsObject = {
        monitorpageName: string,
        id: string,
    }
}

export class RemoveMonitoredProductResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RemoveMonitoredProductResponse.AsObject;
    static toObject(includeInstance: boolean, msg: RemoveMonitoredProductResponse): RemoveMonitoredProductResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RemoveMonitoredProductResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RemoveMonitoredProductResponse;
    static deserializeBinaryFromReader(message: RemoveMonitoredProductResponse, reader: jspb.BinaryReader): RemoveMonitoredProductResponse;
}

export namespace RemoveMonitoredProductResponse {
    export type AsObject = {
    }
}

export class GetFiltersRequest extends jspb.Message { 
    getMonitorpageName(): string;
    setMonitorpageName(value: string): GetFiltersRequest;

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
        monitorpageName: string,
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
    getMonitorpageName(): string;
    setMonitorpageName(value: string): AddFilterRequest;
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
        monitorpageName: string,
        value: string,
    }
}

export class AddFilterResponse extends jspb.Message { 
    getMonitorpageName(): string;
    setMonitorpageName(value: string): AddFilterResponse;

    hasFilter(): boolean;
    clearFilter(): void;
    getFilter(): Filter | undefined;
    setFilter(value?: Filter): AddFilterResponse;

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
        monitorpageName: string,
        filter?: Filter.AsObject,
    }
}

export class Filter extends jspb.Message { 
    getId(): string;
    setId(value: string): Filter;
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
        id: string,
        value: string,
    }
}

export class RemoveFilterRequest extends jspb.Message { 
    getMonitorpageName(): string;
    setMonitorpageName(value: string): RemoveFilterRequest;
    getId(): string;
    setId(value: string): RemoveFilterRequest;

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
        monitorpageName: string,
        id: string,
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
