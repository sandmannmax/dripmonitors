import { AggregateRoot } from "../../core/base/AggregateRoot";
import { UniqueEntityID } from "../../core/base/UniqueEntityID";
import { Validator } from "../../core/logic/Validator";
import { MonitorpageId } from "./MonitorpageId";
import { Product } from "./Product";

interface FilterProps {
  value: string;
  monitorpageId: MonitorpageId;
}

export class Filter extends AggregateRoot<FilterProps> {

  private constructor(props: FilterProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FilterProps, id?: UniqueEntityID): Filter {
    Validator.notNullOrUndefinedBulk([
      { argument: props.value, argumentName: 'value' },
      { argument: props.monitorpageId, argumentName: 'monitorpageId' }
    ]);
    
    return new Filter(props, id);
  }

  get value(): string { return this.props.value; }
  get monitorpageId(): MonitorpageId { return this.props.monitorpageId; }

  public useFilter(product: Product): boolean {
    let filterParts = this.props.value.split(' ');
    let nameIsAccepted = true;

    if (filterParts.length == 0) {
      nameIsAccepted = false;
    }

    for (let i = 0; i < filterParts.length; i++) {
      if (product.name.toLowerCase().indexOf(filterParts[i].toLowerCase()) == -1) {
        nameIsAccepted = false;
        break;
      }
    }

    return nameIsAccepted;
  }
}