import { AggregateRoot } from "../base/AggregateRoot";
import { UniqueEntityID } from "../base/UniqueEntityID";
import { Guard } from "../logic/Guard";
import { Result } from "../logic/Result";
import { Monitorpage } from "./Monitorpage";

interface FilterProps {
  value: string;
  monitorpage: Monitorpage;
}

export class Filter extends AggregateRoot<FilterProps> {

  private constructor(props: FilterProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: FilterProps, id?: UniqueEntityID): Result<Filter> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.value, argumentName: 'value' },
      { argument: props.monitorpage, argumentName: 'monitorpage' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Filter>(guardResult.message);
    }
    
    const filter = new Filter(props, id);

    return Result.ok<Filter>(filter);
  }

  get value(): string { return this.props.value; }
  get monitorpage(): Monitorpage { return this.props.monitorpage; }
}