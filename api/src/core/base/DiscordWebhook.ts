import { ValueObject } from "./ValueObject";
import { Validator } from "../logic/Validator";
import { InvalidDiscordWebhookException } from "../exceptions/InvalidDiscordWebhookException";

interface DiscordWebhookProps {
  value: string;
}

export class DiscordWebhook extends ValueObject<DiscordWebhookProps> {
  private constructor(props: DiscordWebhookProps) {
    super(props);
  }

  public static create(value: string, name: string): DiscordWebhook {
    Validator.notNullOrUndefined(value, name);

    const regex = /^https?:\/\/\)?((canary|ptb)\.)?discord(app)?\.com\/api\/webhooks\/[0-9]{18}\/[A-Za-z0-9\.\-\_]+$/;
    if (!regex.test(value)) {
      throw new InvalidDiscordWebhookException(`\'${value}\' is an invalid Discord Webhook.`);
    }
    
    const discordWebhook = new DiscordWebhook({ value });
    return discordWebhook
  }

  toString(): string { return this.props.value; }

  public equals (discordWebhook?: DiscordWebhook) : boolean {
    if (discordWebhook === null || discordWebhook === undefined) {
      return false;
    }
    if (discordWebhook.props.value === undefined) {
      return false;
    }
    return this.props.value === discordWebhook.props.value;
  }
}