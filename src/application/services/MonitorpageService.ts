import { IMonitorpageRepo } from '../../domain/repos/IMonitorpageRepo';
import { Filter } from '../../domain/models/Filter';
import { Uuid } from '../../core/base/Uuid';
import { MonitorpageDTO } from '../dto/MonitorpageDTO';
import { FilterDTO } from '../dto/FilterDTO';
import { UrlDTO } from '../dto/UrlDTO';
import { MonitorpageMap } from '../mappers/MonitorpageMap';
import { FilterMap } from '../mappers/FilterMap';
import { UrlMap } from '../mappers/UrlMap';
import { Url } from '../../domain/models/Url';
import { IScheduleService } from '../interface/IScheduleService';
import { IntervalTime } from '../../domain/models/IntervalTime';

export interface IMonitorpageService {
  getMonitorpages(): Promise<MonitorpageDTO[]>;
  getMonitorpageByUuid(monitorpageUuid: string): Promise<MonitorpageDTO>;
  runMonitorpage(monitorpageUuid: string): Promise<void>;
  getFiltersByMonitorpageUuid(monitorpageUuid: string): Promise<FilterDTO[]>;
  addFilter(monitorpageUuid: string, filterValue: string): Promise<void>;
  removeFilter(monitorpageUuid: string, filterValue: string): Promise<void>;
  getUrlsByMonitorpageUuid(monitorpageUuid: string): Promise<UrlDTO[]>;
  addUrl(monitorpageUuid: string, urlValue: string): Promise<void>;
  removeUrl(monitorpageUuid: string, urlValue: string): Promise<void>;
  startMonitorpage(monitorpageUuid: string, intervalTime: number): Promise<void>;
  stopMonitorpage(monitorpageUuid: string): Promise<void>;
}

export class MonitorpageService implements IMonitorpageService {
  private monitorpageRepo: IMonitorpageRepo;
  private scheduleService: IScheduleService;

  constructor(
    monitorpageRepo: IMonitorpageRepo,
    scheduleService: IScheduleService,
  ) {
    this.monitorpageRepo = monitorpageRepo;
    this.scheduleService = scheduleService;
  }

  public async getMonitorpages(): Promise<MonitorpageDTO[]> {
    const monitorpages = await this.monitorpageRepo.getMonitorpages();
    const monitorpagesDTO: MonitorpageDTO[] = [];    
    monitorpages.forEach(m => {
      monitorpagesDTO.push(MonitorpageMap.toDTO(m));
    })
    return monitorpagesDTO;
  }

  public async getMonitorpageByUuid(monitorpageUuid: string): Promise<MonitorpageDTO> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    const monitorpageDTO = MonitorpageMap.toDTO(monitorpage);
    return monitorpageDTO;
  }

  public async runMonitorpage(monitorpageUuid: string): Promise<void> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    monitorpage.run();
  }

  public async getFiltersByMonitorpageUuid(monitorpageUuid: string): Promise<FilterDTO[]> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    let filtersDTO: FilterDTO[] = [];
    monitorpage.filters.forEach(f => {
      filtersDTO.push(FilterMap.toDTO(f));
    });
    return filtersDTO;
  }

  public async addFilter(monitorpageUuid: string, filterValue: string): Promise<void> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    const filter = Filter.create({ value: filterValue });
    monitorpage.addFilter(filter);
    await this.monitorpageRepo.save(monitorpage);
  }

  public async removeFilter(monitorpageUuid: string, filterValue: string): Promise<void> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    const filter = Filter.create({ value: filterValue });
    monitorpage.removeFilter(filter);
    await this.monitorpageRepo.save(monitorpage);
  }

  public async getUrlsByMonitorpageUuid(monitorpageUuid: string): Promise<UrlDTO[]> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    let urlsDTO: UrlDTO[] = [];
    monitorpage.urls.forEach(u => {
      urlsDTO.push(UrlMap.toDTO(u));
    });
    return urlsDTO;
  }

  public async addUrl(monitorpageUuid: string, urlValue: string): Promise<void> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    const url = Url.create({ value: urlValue });
    monitorpage.addUrl(url);
    await this.monitorpageRepo.save(monitorpage);
  }

  public async removeUrl(monitorpageUuid: string, urlValue: string): Promise<void> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    const url = Url.create({ value: urlValue });
    monitorpage.removeUrl(url);
    await this.monitorpageRepo.save(monitorpage);
  }

  public async startMonitorpage(monitorpageUuid: string, intervalTime: number): Promise<void> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    const intervalTimeObject = IntervalTime.create({ value: intervalTime });
    monitorpage.startMonitorpage(intervalTimeObject);
    this.scheduleService.schedule({ 
      monitorpageUuid: monitorpage.uuid.toString(),
      intervalTime,
    });
    await this.monitorpageRepo.save(monitorpage);
  }

  public async stopMonitorpage(monitorpageUuid: string): Promise<void> {
    const monitorpage = await this.getMonitorpageByUuidString(monitorpageUuid);
    monitorpage.stopMonitorpage();
    this.scheduleService.clearSchedule({ 
      monitorpageUuid: monitorpage.uuid.toString(),
    });
    await this.monitorpageRepo.save(monitorpage);
  }

  private async getMonitorpageByUuidString(monitorpageUuid: string) {
    const monitorpageUuidObject: Uuid = Uuid.create({ uuid: monitorpageUuid });
    return await this.monitorpageRepo.getMonitorpageByUuid(monitorpageUuidObject);
  }
}