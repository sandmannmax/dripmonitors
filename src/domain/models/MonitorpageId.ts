import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";

interface MonitorpageIdProps {
  value: string;
}

export class MonitorpageId extends ValueObject<MonitorpageIdProps> {
  private constructor (props: MonitorpageIdProps) {
    super(props);
  }

  public static create (props: MonitorpageIdProps): MonitorpageId {
    Validator.notNullOrUndefined(props.value, 'value');

    return new MonitorpageId(props);
  }

  get value(): string { return this.props.value; }
}