import { Entity } from "../../../../core/base/Entity";
import { Uuid } from "../../../../core/base/Uuid";
import { Validator } from "../../../../core/logic/Validator";
import { Filter } from "./Filter";
import { MonitorpageUuid } from "./MonitorpageUuid";

interface MonitorpageAllocationProps {
  monitorpageUuid: MonitorpageUuid;
  isFiltering: boolean;
  filters: Filter[];
}

export class MonitorpageAllocation extends Entity<MonitorpageAllocationProps> {
  private constructor(props: MonitorpageAllocationProps, uuid?: Uuid) {
    super(props, uuid);
  }

  public static create(props: MonitorpageAllocationProps, uuid?: Uuid): MonitorpageAllocation {
    Validator.notNullOrUndefinedBulk([
      { argument: props.monitorpageUuid, argumentName: 'monitorpageUuid' },
      { argument: props.isFiltering, argumentName: 'isFiltering' },
      { argument: props.filters, argumentName: 'filters' },
    ]);

    const monitorpageAllocation = new MonitorpageAllocation(props, uuid);
    return monitorpageAllocation;
  }

  public get uuid(): Uuid { return this._uuid; }
  public get monitorpageUuid(): MonitorpageUuid { return this.props.monitorpageUuid; }
  public get isFiltering(): boolean { return this.props.isFiltering; }
  public get filters(): Filter[] { return this.props.filters; }
}