import { AggregateRoot } from "../../../../core/base/AggregateRoot";
import { Uuid } from "../../../../core/base/Uuid";
import { FilterAlreadyExistingException } from "../../../../core/exceptions/FilterAlreadyExistingException";
import { FilterNotFoundException } from "../../../../core/exceptions/FilterNotFoundException";
import { MonitorpageAllocationNotFilteringException } from "../../../../core/exceptions/MonitorpageAllocationNotFilteringException";
import { MonitorpageAllocationNotFoundException } from "../../../../core/exceptions/MonitorpageAllocationNotFoundException";
import { MonitorpageAlreadyAllocatedException } from "../../../../core/exceptions/MonitorpageAlreadyAllocatedException";
import { Validator } from "../../../../core/logic/Validator";
import { Filter } from "./Filter";
import { MonitorpageAllocation } from "./MonitorpageAllocation";

interface MonitorsourceProps {
  name: string;
  isVisible: boolean;
  isSendingNotifications: boolean;
  monitorpageAllocations: MonitorpageAllocation[];
}

export class Monitorsource extends AggregateRoot<MonitorsourceProps> {
  private constructor(props: MonitorsourceProps, uuid?: Uuid) {
    super(props, uuid);
  }

  public static create(props: MonitorsourceProps, uuid?: Uuid): Monitorsource {
    Validator.notNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' },
      { argument: props.isVisible, argumentName: 'isVisible' },
      { argument: props.isSendingNotifications, argumentName: 'isSendingNotifications' },
      { argument: props.monitorpageAllocations, argumentName: 'monitorpageAllocations' },
    ]);

    const monitorsource = new Monitorsource(props, uuid);
    return monitorsource;
  }

  public get name(): string { return this.props.name; }
  public get isVisible(): boolean { return this.props.isVisible; }
  public get isSendingNotifications(): boolean { return this.props.isSendingNotifications; }
  public get monitorpageAllocations(): MonitorpageAllocation[] { return this.props.monitorpageAllocations; }

  public makeVisible() {
    this.props.isVisible = true;
  }

  public makeInvisible() {
    this.props.isVisible = false;
  }

  public startMonitorsource() {
    this.props.isSendingNotifications = true;
  }

  public stopMonitorsource() {
    this.props.isSendingNotifications = false;
  }

  public addMonitorpageAllocation(monitorpageAllocation: MonitorpageAllocation) {
    const monitorpageIndex = this.props.monitorpageAllocations.findIndex(m => m.monitorpageUuid.uuid.equals(monitorpageAllocation.monitorpageUuid.uuid));

    if (monitorpageIndex !== -1) {
      throw new MonitorpageAlreadyAllocatedException(`Monitorsource {${this._uuid}} is already allocated to Monitorpage {${monitorpageAllocation.monitorpageUuid.uuid.toString()}}.`);
    }

    this.props.monitorpageAllocations.push(monitorpageAllocation);
  }

  public removeMonitorpageAllocation(monitorpageAllocationUuid: Uuid) {
    const monitorpageAllocationIndex = this.props.monitorpageAllocations.findIndex(m => m.uuid.equals(monitorpageAllocationUuid));

    if (monitorpageAllocationIndex === -1) {
      throw new MonitorpageAllocationNotFoundException(`Monitorsource {${this._uuid}} has not MonitorpageAllocation with uuid {${monitorpageAllocationUuid.toString()}}.`);
    }

    this.props.monitorpageAllocations[monitorpageAllocationIndex].deleted = true;
  }

  public addFilterToMonitorpageAllocation(monitorpageAllocationUuid: Uuid, filter: Filter) {
    const monitorpageAllocationIndex = this.props.monitorpageAllocations.findIndex(m => m.uuid.equals(monitorpageAllocationUuid));

    if (monitorpageAllocationIndex === -1) {
      throw new MonitorpageAllocationNotFoundException(`Monitorsource {${this._uuid}} has not MonitorpageAllocation with uuid {${monitorpageAllocationUuid.toString()}}.`);
    } else if (this.props.monitorpageAllocations[monitorpageAllocationIndex].isFiltering === false) {
      throw new MonitorpageAllocationNotFilteringException(`Monitorsource {${this._uuid}} is not filtering.`)
    }

    const filterIndex = this.props.monitorpageAllocations[monitorpageAllocationIndex].filters?.findIndex(f => f.equals(filter));

    if (filterIndex !== -1) {
      throw new FilterAlreadyExistingException(`Monitorsource {${this._uuid}} already has filter \'${filter.value}\'.`);
    }

    this.props.monitorpageAllocations[monitorpageAllocationIndex].filters.push(filter);
  }

  public deleteFilterFromMonitorpageAllocation(monitorpageAllocationUuid: Uuid, filterUuid: Uuid) {
    const monitorpageAllocationIndex = this.props.monitorpageAllocations.findIndex(m => m.uuid.equals(monitorpageAllocationUuid));

    if (monitorpageAllocationIndex === -1) {
      throw new MonitorpageAllocationNotFoundException(`Monitorsource {${this._uuid}} has not MonitorpageAllocation with uuid {${monitorpageAllocationUuid.toString()}}.`);
    } else if (this.props.monitorpageAllocations[monitorpageAllocationIndex].isFiltering === false) {
      throw new MonitorpageAllocationNotFilteringException(`Monitorsource {${this._uuid}} is not filtering.`)
    }

    if (this.props.monitorpageAllocations[monitorpageAllocationIndex].filters === undefined) {
      throw new FilterNotFoundException(`Monitorsource {${this._uuid}} has no filter with uuid \'${filterUuid}\'.`);
    }

    const filterIndex = this.props.monitorpageAllocations[monitorpageAllocationIndex].filters.findIndex(f => f.uuid.equals(filterUuid));

    if (filterIndex === -1) {
      throw new FilterNotFoundException(`Monitorsource {${this._uuid}} has no filter with uuid \'${filterUuid}\'.`);
    }

    this.props.monitorpageAllocations[monitorpageAllocationIndex].filters.splice(filterIndex, 1);
  }

  public checkShouldNotify(name: string, monitorpageUuid: Uuid): boolean {
    if (this.props.isSendingNotifications === false) {
      return false;
    }

    const monitorpageAllocationIndex = this.props.monitorpageAllocations.findIndex(m => m.monitorpageUuid.uuid.equals(monitorpageUuid));

    if (monitorpageAllocationIndex === -1) {
      return false;
    }

    const monitorpageAllocation = this.props.monitorpageAllocations[monitorpageAllocationIndex];

    if (monitorpageAllocation.isFiltering === false) {
      return true;
    }

    let shouldNotify = false;

    for (let i = 0; i < monitorpageAllocation.filters.length; i++) {
      if (monitorpageAllocation.filters[i].useFilter(name)) {
        shouldNotify = true;
        break;
      }
    }

    return shouldNotify;
  }
}