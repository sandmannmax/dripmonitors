import { Entity } from "../../../../core/base/Entity";
import { Uuid } from "../../../../core/base/Uuid";
import { Validator } from "../../../../core/logic/Validator";

interface FilterProps {
  value: string;
}

export class Filter extends Entity<FilterProps> {

  private constructor(props: FilterProps, uuid?: Uuid) {
    super(props, uuid);
  }

  public static create(props: FilterProps, uuid?: Uuid): Filter {
    Validator.notNullOrUndefined(props.value, 'filterValue');
    
    return new Filter(props, uuid);
  }

  get uuid(): Uuid { return this._uuid; }
  get value(): string { return this.props.value; }

  public useFilter(name: string): boolean {
    let filterParts = this.props.value.split(' ');
    let nameIsAccepted = true;

    if (filterParts.length == 0) {
      nameIsAccepted = false;
    }

    for (let i = 0; i < filterParts.length; i++) {
      if (name.toLowerCase().indexOf(filterParts[i].toLowerCase()) === -1) {
        nameIsAccepted = false;
        break;
      }
    }

    return nameIsAccepted;
  }
}