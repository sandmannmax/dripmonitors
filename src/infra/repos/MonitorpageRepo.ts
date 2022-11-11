import { RedisClient } from "redis";
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { IMonitorpageRepo } from "../../domain/repos/IMonitorpageRepo";
import { Monitorpage } from "../../domain/models/Monitorpage";
import { MonitorpageSetupDTO } from "../../application/dto/MonitorpageSetupDTO";
import { MonitorpageNotExistingException } from "../../core/exceptions/MonitorpageNotExistingException";
import { Filter } from "../../domain/models/Filter";
import { Url } from "../../domain/models/Url";
import { Uuid } from "../../core/base/Uuid";
import { IntervalTime } from "../../domain/models/IntervalTime";
import { logger } from "../../util/logger";

export class MonitorpageRepo implements IMonitorpageRepo {
  private monitorpageSetups: MonitorpageSetupDTO[];
  private redisClient: WrappedNodeRedisClient;

  constructor(monitorpageSetups: MonitorpageSetupDTO[], redisClient: RedisClient) {
    this.monitorpageSetups = monitorpageSetups;
    this.redisClient = createNodeRedisClient(redisClient);
  }

  public async getMonitorpages(): Promise<Monitorpage[]> {
    const monitorpageUuids = this.monitorpageSetups.map(m => m.uuid);
    const monitorpagePromises: Promise<Monitorpage>[] = [];

    for(let i = 0; i < monitorpageUuids.length; i++) {
      monitorpagePromises.push(this.getMonitorpageByUuid(monitorpageUuids[i]));
    }

    const monitorpages = await Promise.all(monitorpagePromises);

    return monitorpages;
  }
  
  public async getMonitorpageByUuid(monitorpageUuid: Uuid): Promise<Monitorpage> {
    const monitorpage = this.monitorpageSetups.find(m => m.uuid.equals(monitorpageUuid));

    if (monitorpage === undefined) {
      throw new MonitorpageNotExistingException("Monitorpage is not existing");
    }

    const monitorpageIdString = monitorpageUuid.toString();    

    const urlStrings = await this.redisClient.smembers(`monitorpage:${monitorpageIdString}:url`);
    const filterStrings = await this.redisClient.smembers(`monitorpage:${monitorpageIdString}:filter`);
    const intervalTimeString = await this.redisClient.get(`monitorpage:${monitorpageIdString}:interval`);

    const urls: Url[] = [];
    urlStrings.forEach(urlString => {
      urls.push(Url.create({ value: urlString }));
    });

    const filters: Filter[] = [];
    filterStrings.forEach(filterString => {
      filters.push(Filter.create({ value: filterString }));
    });

    let intervalTime = IntervalTime.create({ value: 0 });
    if (intervalTimeString != null) {
      intervalTime = IntervalTime.create({ value: Number.parseInt(intervalTimeString) });
    }

    return Monitorpage.create({
      monitorpageName: monitorpage.monitorpageName,
      monitorpageDisplayName: monitorpage.monitorpageDisplayName,
      monitorpageFunctionality: monitorpage.monitorpageFunctionality,
      cc: monitorpage.cc,
      monitorAllProducts: monitorpage.monitorAllProducts,
      showMonitorpageDisplayName: monitorpage.showMonitorpageDisplayName,
      filters,
      urls,
      intervalTime,
    }, monitorpage.uuid);
  }

  public async exists(monitorpageUuid: Uuid): Promise<boolean> {
    const monitorpageIndex = this.monitorpageSetups.findIndex(m => m.uuid.equals(monitorpageUuid));
    return monitorpageIndex !== -1;
  }

  public async save(monitorpage: Monitorpage): Promise<void> {
    const urlStrings = monitorpage.urls.map(url => url.value);
    const filterStrings = monitorpage.filters.map(filter => filter.value);

    const monitorpageUuidString = monitorpage.uuid.toString();

    await this.redisClient.multi()
      .sadd(`monitorpage:${monitorpageUuidString}:url`, ...urlStrings)
      .sadd(`monitorpage:${monitorpageUuidString}:filter`, ...filterStrings)
      .set(`monitorpage:${monitorpageUuidString}:interval`, monitorpage.intervalTime.toString())
      .exec();
  }

  public async isRunning(monitorpageUuid: Uuid): Promise<boolean> {
    const monitorpageUuidString = monitorpageUuid.toString();
    const running = await this.redisClient.get(`monitorpage:${monitorpageUuidString}:running`);
    return running === '1';
  }

  public async startRunning(monitorpageUuid: Uuid): Promise<void> {
    const monitorpageUuidString = monitorpageUuid.toString();
    await this.redisClient.set(`monitorpage:${monitorpageUuidString}:running`, '1', ['EX', 60]);
  }

  public async stopRunning(monitorpageUuid: Uuid): Promise<void> {
    const monitorpageUuidString = monitorpageUuid.toString();
    await this.redisClient.set(`monitorpage:${monitorpageUuidString}:running`, '0');
  }
}