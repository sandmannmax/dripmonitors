import { v4 as uuidv4 } from 'uuid';
import validate from 'uuid-validate';
import md5 from 'md5';
import { ValueObject } from './ValueObject';
import { InvalidUuidException } from '../exceptions/InvalidUuidException';
import { Validator } from '../logic/Validator';
import { NullOrUndefinedException } from '../exceptions/NullOrUndefinedException';
import { InvalidUuidParametersException } from '../exceptions/InvalidUuidParametersException';
import { logger } from '../../utils/logger';

interface UuidProps {
  value: string;
}

export class Uuid extends ValueObject<UuidProps> {
  private constructor(props: UuidProps) {
    super(props);
  }

  public static create({ from, uuid, base, name }: { from: "new" | "base" | "uuid", uuid?: string, base?: string, name?: string }): Uuid {
    if (Validator.isNullOrUndefined(from)) {
      throw new NullOrUndefinedException('from can\'t be null for Uuid.');
    }

    if (from === 'new') {
      return new Uuid({ value: uuidv4() });
    } else if (from === 'uuid') {
      if (uuid != undefined && uuid != null) {
        if (!validate(uuid, 4)) {
          let message = 'Invalid Uuid';
          if (name != undefined) {
            message = 'Invalid ' + name;
          }          
          throw new InvalidUuidException(message);
        }
        return new Uuid({ value: uuid })
      } else {
        let message = 'uuid';
        if (name != undefined) {
          message = name;
        }     
        message += ' is missing';   
        throw new InvalidUuidParametersException(message);
      }
    } else if (from === 'base') {
      if (base != undefined && base != null) {
        if (base === '') {
          throw new InvalidUuidParametersException('base can\'t be empty.');
        }
        const baseHash = md5(base);
        const newUuid = uuidv4({ random: Buffer.from(baseHash, 'hex') });
        return new Uuid({ value: newUuid });
      } else {
        throw new InvalidUuidParametersException('base is missing.');
      }
    } else {
      throw new InvalidUuidParametersException('from must be new, uuid or base.');
    }
  }

  toString () {
    return this.props.value;
  }
}