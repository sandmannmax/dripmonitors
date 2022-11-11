// package: proxy.v1
// file: proxy/v1/proxy.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

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

export class CreateProxyRequest extends jspb.Message { 
    getAddress(): string;
    setAddress(value: string): CreateProxyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateProxyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateProxyRequest): CreateProxyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateProxyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateProxyRequest;
    static deserializeBinaryFromReader(message: CreateProxyRequest, reader: jspb.BinaryReader): CreateProxyRequest;
}

export namespace CreateProxyRequest {
    export type AsObject = {
        address: string,
    }
}

export class CreateProxyResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): CreateProxyResponse;

    hasProxy(): boolean;
    clearProxy(): void;
    getProxy(): Proxy | undefined;
    setProxy(value?: Proxy): CreateProxyResponse;
    getMessage(): string;
    setMessage(value: string): CreateProxyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateProxyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateProxyResponse): CreateProxyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateProxyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateProxyResponse;
    static deserializeBinaryFromReader(message: CreateProxyResponse, reader: jspb.BinaryReader): CreateProxyResponse;
}

export namespace CreateProxyResponse {
    export type AsObject = {
        success: boolean,
        proxy?: Proxy.AsObject,
        message: string,
    }
}

export class DeleteProxyRequest extends jspb.Message { 
    getId(): string;
    setId(value: string): DeleteProxyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteProxyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteProxyRequest): DeleteProxyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteProxyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteProxyRequest;
    static deserializeBinaryFromReader(message: DeleteProxyRequest, reader: jspb.BinaryReader): DeleteProxyRequest;
}

export namespace DeleteProxyRequest {
    export type AsObject = {
        id: string,
    }
}

export class DeleteProxyResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): DeleteProxyResponse;
    getMessage(): string;
    setMessage(value: string): DeleteProxyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteProxyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteProxyResponse): DeleteProxyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteProxyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteProxyResponse;
    static deserializeBinaryFromReader(message: DeleteProxyResponse, reader: jspb.BinaryReader): DeleteProxyResponse;
}

export namespace DeleteProxyResponse {
    export type AsObject = {
        success: boolean,
        message: string,
    }
}

export class GetRandomProxyRequest extends jspb.Message { 
    getMonitorpageId(): string;
    setMonitorpageId(value: string): GetRandomProxyRequest;
    getCc(): string;
    setCc(value: string): GetRandomProxyRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRandomProxyRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetRandomProxyRequest): GetRandomProxyRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRandomProxyRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRandomProxyRequest;
    static deserializeBinaryFromReader(message: GetRandomProxyRequest, reader: jspb.BinaryReader): GetRandomProxyRequest;
}

export namespace GetRandomProxyRequest {
    export type AsObject = {
        monitorpageId: string,
        cc: string,
    }
}

export class GetRandomProxyResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): GetRandomProxyResponse;

    hasProxy(): boolean;
    clearProxy(): void;
    getProxy(): Proxy | undefined;
    setProxy(value?: Proxy): GetRandomProxyResponse;
    getMessage(): string;
    setMessage(value: string): GetRandomProxyResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetRandomProxyResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetRandomProxyResponse): GetRandomProxyResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetRandomProxyResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetRandomProxyResponse;
    static deserializeBinaryFromReader(message: GetRandomProxyResponse, reader: jspb.BinaryReader): GetRandomProxyResponse;
}

export namespace GetRandomProxyResponse {
    export type AsObject = {
        success: boolean,
        proxy?: Proxy.AsObject,
        message: string,
    }
}

export class SetCooldownRequest extends jspb.Message { 
    getProxyId(): string;
    setProxyId(value: string): SetCooldownRequest;
    getMonitorpageId(): string;
    setMonitorpageId(value: string): SetCooldownRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetCooldownRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SetCooldownRequest): SetCooldownRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetCooldownRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetCooldownRequest;
    static deserializeBinaryFromReader(message: SetCooldownRequest, reader: jspb.BinaryReader): SetCooldownRequest;
}

export namespace SetCooldownRequest {
    export type AsObject = {
        proxyId: string,
        monitorpageId: string,
    }
}

export class SetCooldownResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SetCooldownResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SetCooldownResponse): SetCooldownResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SetCooldownResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SetCooldownResponse;
    static deserializeBinaryFromReader(message: SetCooldownResponse, reader: jspb.BinaryReader): SetCooldownResponse;
}

export namespace SetCooldownResponse {
    export type AsObject = {
    }
}

export class ResetCooldownRequest extends jspb.Message { 
    getProxyId(): string;
    setProxyId(value: string): ResetCooldownRequest;
    getMonitorpageId(): string;
    setMonitorpageId(value: string): ResetCooldownRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetCooldownRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ResetCooldownRequest): ResetCooldownRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetCooldownRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetCooldownRequest;
    static deserializeBinaryFromReader(message: ResetCooldownRequest, reader: jspb.BinaryReader): ResetCooldownRequest;
}

export namespace ResetCooldownRequest {
    export type AsObject = {
        proxyId: string,
        monitorpageId: string,
    }
}

export class ResetCooldownResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetCooldownResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ResetCooldownResponse): ResetCooldownResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetCooldownResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetCooldownResponse;
    static deserializeBinaryFromReader(message: ResetCooldownResponse, reader: jspb.BinaryReader): ResetCooldownResponse;
}

export namespace ResetCooldownResponse {
    export type AsObject = {
    }
}

export class Proxy extends jspb.Message { 
    getId(): string;
    setId(value: string): Proxy;
    getAddress(): string;
    setAddress(value: string): Proxy;
    getCc(): string;
    setCc(value: string): Proxy;
    clearCooldownsList(): void;
    getCooldownsList(): Array<Cooldown>;
    setCooldownsList(value: Array<Cooldown>): Proxy;
    addCooldowns(value?: Cooldown, index?: number): Cooldown;

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
        id: string,
        address: string,
        cc: string,
        cooldownsList: Array<Cooldown.AsObject>,
    }
}

export class Cooldown extends jspb.Message { 
    getId(): string;
    setId(value: string): Cooldown;
    getMonitorpageId(): string;
    setMonitorpageId(value: string): Cooldown;
    getCount(): number;
    setCount(value: number): Cooldown;
    getRemaining(): number;
    setRemaining(value: number): Cooldown;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Cooldown.AsObject;
    static toObject(includeInstance: boolean, msg: Cooldown): Cooldown.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Cooldown, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Cooldown;
    static deserializeBinaryFromReader(message: Cooldown, reader: jspb.BinaryReader): Cooldown;
}

export namespace Cooldown {
    export type AsObject = {
        id: string,
        monitorpageId: string,
        count: number,
        remaining: number,
    }
}
