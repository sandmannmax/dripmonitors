import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";

interface MonitorpageNameProps {
  value: string;
}

export class MonitorpageName extends ValueObject<MonitorpageNameProps> {
  private constructor (props: MonitorpageNameProps) {
    super(props);
  }

  public static create (props: MonitorpageNameProps): MonitorpageName {
    Validator.notNullOrUndefined(props.value, 'value');

    return new MonitorpageName(props);
  }

  get value(): string { return this.props.value; }
}