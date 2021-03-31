import { ValueObject } from "../base/ValueObject";
import { Guard } from "../logic/Guard";
import { Result } from "../logic/Result";

interface SizeProps {
  value: string;
  soldOut: boolean;
}

export class Size extends ValueObject<SizeProps> {
  private constructor (props: SizeProps) {
    super(props);
  }

  public static create (props: SizeProps): Result<Size> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.value, argumentName: 'value' },
      { argument: props.soldOut, argumentName: 'soldOut' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Size>(guardResult.message);
    }
    
    const size = new Size(props);

    return Result.ok<Size>(size);
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