import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";

interface IntervalTimeProps {
  value: number;
}

export class IntervalTime extends ValueObject<IntervalTimeProps> {
  private constructor (props: IntervalTimeProps) {
    super(props);
  }

  public static create (props: IntervalTimeProps): IntervalTime {
    Validator.notNullOrUndefined(props.value, 'value');

    return new IntervalTime(props);
  }

  get value(): number { return this.props.value; }
}