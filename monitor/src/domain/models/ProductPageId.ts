import { ValueObject } from "../../core/base/ValueObject";
import { Validator } from "../../core/logic/Validator";

interface ProductPageIdProps {
  value: string;
}

export class ProductPageId extends ValueObject<ProductPageIdProps> {
  private constructor (props: ProductPageIdProps) {
    super(props);
  }

  public static create (props: ProductPageIdProps): ProductPageId {
    Validator.notNullOrUndefined(props.value, 'value');

    return new ProductPageId(props);
  }

  get value(): string { return this.props.value; }
}