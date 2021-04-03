// package: monitor.v1
// file: monitor/v1/monitor.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class GetProductsRequest extends jspb.Message { 
    getMonitorpageId(): string;
    setMonitorpageId(value: string): GetProductsRequest;

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
        monitorpageId: string,
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
    getProductId(): string;
    setProductId(value: string): Product;
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
        productId: string,
        name: string,
        href: string,
        img: string,
        monitored: boolean,
    }
}

export class ActivateProductMonitoringRequest extends jspb.Message { 
    getMonitorpageId(): string;
    setMonitorpageId(value: string): ActivateProductMonitoringRequest;
    getId(): string;
    setId(value: string): ActivateProductMonitoringRequest;

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
        monitorpageId: string,
        id: string,
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
    getMonitorpageId(): string;
    setMonitorpageId(value: string): DisableProductMonitoringRequest;
    getId(): string;
    setId(value: string): DisableProductMonitoringRequest;

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
        monitorpageId: string,
        id: string,
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
    getMonitorpageId(): string;
    setMonitorpageId(value: string): GetFiltersRequest;

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
        monitorpageId: string,
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
    getMonitorpageId(): string;
    setMonitorpageId(value: string): AddFilterRequest;
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
        monitorpageId: string,
        value: string,
    }
}

export class AddFilterResponse extends jspb.Message { 

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
    getMonitorpageId(): string;
    setMonitorpageId(value: string): RemoveFilterRequest;
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
        monitorpageId: string,
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
