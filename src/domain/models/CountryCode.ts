import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";
import { Product } from "./Product";

interface CountryCodeProps {
  value: string;
}

export class CountryCode extends ValueObject<CountryCodeProps> {

  private constructor(props: CountryCodeProps) {
    super(props);
  }

  public static create(props: CountryCodeProps): CountryCode {
    Validator.notNullOrUndefined(props.value, 'value');
    
    return new CountryCode(props);
  }

  get value(): string { return this.props.value; }
}