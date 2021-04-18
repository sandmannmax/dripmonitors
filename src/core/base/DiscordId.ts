import { ValueObject } from "./ValueObject";
import { Validator } from "../logic/Validator";
import { InvalidDiscordIdException } from "../exceptions/InvalidDiscordIdException";

interface DiscordIdProps {
  value: string;
}

export class DiscordId extends ValueObject<DiscordIdProps> {
  private constructor(props: DiscordIdProps) {
    super(props);
  }

  public static create(value: string): DiscordId {
    Validator.notNullOrUndefined(value, 'value');

    const regex = /^[0-9]{18}$/;
    if (!regex.test(value)) {
      throw new InvalidDiscordIdException(`{${value}} is an invalid DiscordId.`);
    }
    
    const discordId = new DiscordId({ value });
    return discordId
  }

  toString(): string { return this.props.value; }

  public equals (discordId?: DiscordId) : boolean {
    if (discordId === null || discordId === undefined) {
      return false;
    }
    if (discordId.props.value === undefined) {
      return false;
    }
    return this.props.value === discordId.props.value;
  }
}