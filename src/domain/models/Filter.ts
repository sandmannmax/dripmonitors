import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";
import { Product } from "./Product";

interface FilterProps {
  value: string;
}

export class Filter extends ValueObject<FilterProps> {

  private constructor(props: FilterProps) {
    super(props);
  }

  public static create(props: FilterProps): Filter {
    Validator.notNullOrUndefined(props.value, 'value');
    
    return new Filter(props);
  }

  get value(): string { return this.props.value; }

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