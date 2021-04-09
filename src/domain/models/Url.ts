import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";

interface UrlProps {
  value: string;
}

export class Url extends ValueObject<UrlProps> {

  private constructor(props: UrlProps) {
    super(props);
  }

  public static create(props: UrlProps): Url {
    Validator.notNullOrUndefined(props.value, 'value');
    
    return new Url(props);
  }

  get value(): string { return this.props.value; }
}