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
    Validator.notNullOrUndefined(props.value, 'imageUrl');
    
    const imageUrlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    if (!imageUrlRegex.test(props.value)) {
      throw new InvalidImageUrlException(`\'${props.value}\' is an invalid image url.`);
    }

    return new ImageUrl(props);
  }

  get value(): string { return this.props.value; }
}