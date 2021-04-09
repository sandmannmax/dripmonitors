import { AggregateRoot } from "../../core/base/AggregateRoot";
import { Uuid } from "../../core/base/Uuid";
import { Validator } from "../../core/logic/Validator";
import { Filter } from "./Filter";
import { MonitorpageName } from "./MonitorpageName";
import { IMonitorpageFunctionality } from "../interfaces/IMonitorpageFunctionality";
import { Url } from "./Url";
import { CountryCode } from "./CountryCode";
import { FilterDuplicateException } from "../../core/exceptions/FilterDuplicateException";
import { FilterNotExistingException } from "../../core/exceptions/FilterNotExisingException";
import { MonitorpageDisplayName } from "./MonitorpageDisplayName";
import { IntervalTime } from "./IntervalTime";
import { UrlDuplicateException } from "../../core/exceptions/UrlDuplicateException";
import { UrlNotExistingException } from "../../core/exceptions/UrlNotExistingException";

interface MonitorpageProps {
  monitorpageName: MonitorpageName;
  monitorpageDisplayName: MonitorpageDisplayName;
  monitorpageFunctionality: IMonitorpageFunctionality;
  cc: CountryCode;
  urls: Url[];
  filters: Filter[];
  intervalTime: IntervalTime;
  monitorAllProducts: boolean;
  showMonitorpageDisplayName: boolean;
}

export class Monitorpage extends AggregateRoot<MonitorpageProps> {

  private constructor(props: MonitorpageProps, uuid: Uuid) {
    super(props, uuid);
  }

  public static create(props: MonitorpageProps, uuid?: Uuid): Monitorpage {
    Validator.notNullOrUndefinedBulk([
      { argument: props.monitorpageName, argumentName: 'monitorpageName' },
      { argument: props.monitorpageDisplayName, argumentName: 'monitorpageDisplayName' },
      { argument: props.monitorpageFunctionality, argumentName: 'monitorpageFunctionality' },
      { argument: props.cc, argumentName: 'cc' },
      { argument: props.urls, argumentName: 'urls' },
      { argument: props.filters, argumentName: 'filters' },
      { argument: props.intervalTime, argumentName: 'intervalTime' },
      { argument: props.monitorAllProducts, argumentName: 'monitorAllProducts' },
      { argument: props.showMonitorpageDisplayName, argumentName: 'showMonitorpageDisplayName' },
    ]);

    if (uuid === undefined) {
      uuid = Uuid.create({ base: props.monitorpageName.value });
    }
    
    return new Monitorpage(props, uuid);
  }

  get monitorpageName(): MonitorpageName { return this.props.monitorpageName; }
  get monitorpageDisplayName(): MonitorpageDisplayName { return this.props.monitorpageDisplayName; }
  get cc(): CountryCode { return this.props.cc; }
  get urls(): Url[] { return this.props.urls; }
  get filters(): Filter[] { return this.props.filters; }
  get intervalTime(): IntervalTime { return this.props.intervalTime; }
  get monitorAllProducts(): boolean { return this.props.monitorAllProducts; }
  get displayMonitorpagename(): boolean { return this.props.showMonitorpageDisplayName; }

  public run() {
    this.props.monitorpageFunctionality.run({ urls: this.props.urls, filters: this.props.filters, cc: this.props.cc });
  }

  public startMonitorpage(intervalTime: IntervalTime) {
    this.props.intervalTime = intervalTime;
  }

  public stopMonitorpage() {
    this.props.intervalTime = IntervalTime.create({ value: 0 });
  }

  public addFilter(filter: Filter) {
    this.props.filters.forEach(f => {
      if (f.equals(filter)) {
        throw new FilterDuplicateException(`Filter with value {${filter.value}} is already existing.`);
      }
    });

    this.props.filters.push(filter);
  }

  public removeFilter(filter: Filter) {
    const filterIndex = this.props.filters.findIndex(f => f.equals(filter));

    if (filterIndex === -1) {
      throw new FilterNotExistingException(`Filter with value {${filter.value}} is not existing.`);
    }

    this.props.filters.splice(filterIndex, 1);
  }

  public addUrl(url: Url) {
    this.props.urls.forEach(u => {
      if (u.equals(url)) {
        throw new UrlDuplicateException(`Url with value {${url.value}} is already existing.`);
      }
    });

    this.props.urls.push(url);
  }

  public removeUrl(url: Url) {
    const urlIndex = this.props.urls.findIndex(u => u.equals(url));

    if (urlIndex === -1) {
      throw new UrlNotExistingException(`Url with value {${url.value}} is not existing.`);
    }

    this.props.urls.splice(urlIndex, 1);
  }
}