import { v4 as uuidv4, validate } from 'uuid';
import md5 from 'md5';
import { ValueObject } from './ValueObject';
import { InvalidUuidException } from '../exceptions/InvalidUuidException';

interface UuidProps {
  value: string;
}

export class Uuid extends ValueObject<UuidProps> {
  private constructor(props: UuidProps) {
    super(props);
  }

  public static create({ uuid, base }: { uuid?: string, base?: string }): Uuid {
    if (uuid != undefined) {
      if (!validate(uuid)) {
        throw new InvalidUuidException();
      }
      return new Uuid({ value: uuid })
    }

    if (base != undefined) {
      const baseHash = md5(base);
      const newUuid = uuidv4({ random: Buffer.from(baseHash, 'hex') });
      return new Uuid({ value: newUuid });
    }

    return new Uuid({ value: uuidv4() });
  }

  toString () {
    return this.props.value;
  }
}