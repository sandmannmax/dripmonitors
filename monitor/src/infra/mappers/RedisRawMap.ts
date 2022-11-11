import { logger } from "../../util/logger";

export class RedisRawMap {
  public static toRaw(data: Record<string,string>): any {
    let raw: any = {};
    for (let key in data) {
      raw[key] = data[key];
    }
    return raw;
  }

  public static toPersistence(raw: any): [field: string, value: string][] {
    let persistence: [field: string, value: string][] = [];
    for (let key in raw) {
      persistence.push([key, raw[key]]);
    }
    return persistence;
  }
}