import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";

interface SizeProps {
  value: string;
  soldOut: boolean;
}

export class Size extends ValueObject<SizeProps> {
  private constructor (props: SizeProps) {
    super(props);
  }

  public static create (props: SizeProps): Size {
    Validator.notNullOrUndefinedBulk([
      { argument: props.value, argumentName: 'value' },
      { argument: props.soldOut, argumentName: 'soldOut' }
    ]);
    
    return new Size(props);
  }

  get value(): string { return this.props.value; }
  get soldOut(): boolean { return this.props.soldOut; }

  public equals(size?: Size): boolean {
    if (size === null || size === undefined) {
      return false;
    }
    if (size.props === undefined) {
      return false;
    }
    return size.props.value === this.props.value;
  }
}