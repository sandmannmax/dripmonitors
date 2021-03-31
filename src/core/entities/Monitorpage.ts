import { ValueObject } from "../base/ValueObject";
import { Guard } from "../logic/Guard";
import { Result } from "../logic/Result";

interface MonitorpageProps {
  name: string;
}

export class Monitorpage extends ValueObject<MonitorpageProps> {
  private constructor (props: MonitorpageProps) {
    super(props);
  }

  public static create (props: MonitorpageProps): Result<Monitorpage> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.name, argumentName: 'name' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Monitorpage>(guardResult.message);
    }

    const monitorpage = new Monitorpage(props);

    return Result.ok<Monitorpage>(monitorpage);
  }

  get name(): string { return this.props.name; }
}