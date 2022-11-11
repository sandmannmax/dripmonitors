import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";

interface MonitorpageDisplayNameProps {
  value: string;
}

export class MonitorpageDisplayName extends ValueObject<MonitorpageDisplayNameProps> {
  private constructor (props: MonitorpageDisplayNameProps) {
    super(props);
  }

  public static create (props: MonitorpageDisplayNameProps): MonitorpageDisplayName {
    Validator.notNullOrUndefined(props.value, 'value');

    return new MonitorpageDisplayName(props);
  }

  get value(): string { return this.props.value; }
}