import { AggregateRoot } from "../../core/base/AggregateRoot";
import { UniqueEntityID } from "../../core/base/UniqueEntityID";
import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";
import { MonitorpageId } from "./MonitorpageId";
import { Product } from "./Product";

interface PriceProps {
  value: number;
  currency: string;
}

export class Price extends ValueObject<PriceProps> {

  private constructor(props: PriceProps) {
    super(props);
  }

  public static create(props: PriceProps): Price {
    Validator.notNullOrUndefinedBulk([
      { argument: props.value, argumentName: 'value' },
      { argument: props.currency, argumentName: 'currency' }
    ]);
    
    return new Price(props);
  }

  get value(): number { return this.props.value; }
  get currency(): string { return this.props.currency; }

  public toString(): string {
    return `${this.props.value.toFixed(2)} ${this.props.currency}`;
  }
}