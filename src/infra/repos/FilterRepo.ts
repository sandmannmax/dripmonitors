import { RedisClient } from "redis";
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { IFilterRepo } from "../../domain/repos/IFilterRepo";
import { Filter } from "../../domain/models/Filter";
import { FilterMap } from "../../application/mappers/FilterMap";
import { RedisRawMap } from "../mappers/RedisRawMap";
import { logger } from "../../util/logger";

export class FilterRepo implements IFilterRepo {
  private redisClient: WrappedNodeRedisClient;

  constructor(redisClient: RedisClient) {
    this.redisClient = createNodeRedisClient(redisClient);
  }
  
  async getFilterById(id: string): Promise<Filter> {
    let filter = await this.redisClient.hgetall(`filter:${id}`);
    let filterRaw = RedisRawMap.toRaw(filter);
    return FilterMap.toAggregate(filterRaw, id);
  }

  async getFiltersByMonitorpageId(monitorpageId: string): Promise<Filter[]> {
    let ids = await this.redisClient.smembers(`filter:monitorpage:${monitorpageId}`);

    let filterPromises: Promise<Filter | null>[] = [];
    for (let i = 0; i < ids.length; i++) {
      filterPromises.push(this.getFilterById(ids[i]));
    }

    let filtersOrNull = await Promise.all(filterPromises);
    let filters: Filter[] = [];

    for (let i = 0; i < filtersOrNull.length; i++) {
      let filterOrNull = filtersOrNull[i];
      if (filterOrNull != null) {
        filters.push(filterOrNull);
      }
    }

    return filters;
  }

  async exists(id: string): Promise<boolean> {
    let result = await this.redisClient.sismember('filter', id);
    return result == 1;
  }

  async save(filter: Filter): Promise<void> {
    let filterId = filter.id.toValue().toString();
    let filterExists = await this.exists(filterId);

    let filterPersistence = FilterMap.toPersistence(filter);

    if (filterExists) {
      await this.redisClient.hset(`filter:${filterId}`, ...RedisRawMap.toPersistence(filterPersistence));
    } else {
      await this.redisClient.multi()
        .sadd('filter', filterId)
        .sadd(`filter:monitorpage:${filter.monitorpageId.value}`, filterId)
        .hset(`filter:${filterId}`, ...RedisRawMap.toPersistence(filterPersistence))
        .exec();
    }
  }

  async delete(id: string): Promise<void> {
    let filter = await this.getFilterById(id);

    if (filter) {
      let fields = this.getFilterFields(filter);

      await this.redisClient.multi()
        .srem('filter', id)
        .srem(`filter:monitorpage:${filter.monitorpageId.value}`, id)
        .hdel(`filter:${id}`, ...fields)
        .exec();
    }
  }

  private getFilterFields(filter: Filter): string[] {
    let filterPersistence = FilterMap.toPersistence(filter);
    let filterPersistenceRedis = RedisRawMap.toPersistence(filterPersistence);

    let filterFields: string[] = [];

    for (let i = 0; i < filterPersistenceRedis.length; i++) {
      filterFields.push(filterPersistenceRedis[i][0]);
    }

    return filterFields;
  }
}