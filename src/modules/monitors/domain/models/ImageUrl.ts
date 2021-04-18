import { ValueObject } from "../../../../core/base/ValueObject";
import { InvalidImageUrlException } from "../../../../core/exceptions/InvalidImageUrlException";
import { Validator } from "../../../../core/logic/Validator";

interface ImageUrlProps {
  value: string;
}

export class ImageUrl extends ValueObject<ImageUrlProps> {
  private constructor(props: ImageUrlProps) {
    super(props);
  }

  public static create(props: ImageUrlProps): ImageUrl {
    Validator.notNullOrUndefined(props.value, 'value');
    
    const imageUrlRegex = /^https?:\/\/[^\'"<>]+?\.(jpg|jpeg|gif|png|svg)(\?[^\'"<>]+?)?$/;

    if (!imageUrlRegex.test(props.value)) {
      throw new InvalidImageUrlException(`{${props.value}} is an invalid image url.`);
    }

    return new ImageUrl(props);
  }

  get value(): string { return this.props.value; }
}