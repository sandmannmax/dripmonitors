import { ValueObject } from "../../../../core/base/ValueObject";
import { Validator } from "../../../../core/logic/Validator";
import { InvalidWebhookUrlException } from "../exceptions/InvalidWebhookUrlException";
import { DiscordId } from "../../../../core/base/DiscordId";

interface NotificationTargetProps {
  webhookId: DiscordId;
  webhookToken: string;
  isInvalid: boolean;
}

export class NotificationTarget extends ValueObject<NotificationTargetProps> {
  private constructor(props: NotificationTargetProps) {
    super(props);
  }

  public static create(props: NotificationTargetProps): NotificationTarget {
    Validator.notNullOrUndefinedBulk([
      { argument: props.webhookId, argumentName: 'webhookId' },
      { argument: props.webhookToken, argumentName: 'webhookToken' },
      { argument: props.isInvalid, argumentName: 'isInvalid' },
    ]);

    const notificationTarget = new NotificationTarget(props);
    return notificationTarget;
  }

  public static createFromUrl({ webhookUrl, isInvalid }: { webhookUrl: string, isInvalid: boolean }): NotificationTarget {
    Validator.notNullOrUndefinedBulk([
      { argument: webhookUrl, argumentName: 'webhookUrl' },
      { argument: isInvalid, argumentName: 'isInvalid' },
    ]);

    const paramsQuestionMarkIndex = webhookUrl.indexOf('?');

    if (paramsQuestionMarkIndex != -1) {
      webhookUrl = webhookUrl.substr(0, paramsQuestionMarkIndex); // cuts the part from questionmark to the end away
    }

    if (webhookUrl.endsWith('/')) {
      webhookUrl = webhookUrl.substr(0, webhookUrl.length - 1);
    }

    const webHookUrlRegex = /^https?:\/\/\)?((canary|ptb)\.)?discord(app)?\.com\/api\/webhooks\/[0-9]{18}\/[A-Za-z0-9\.\-\_]+$/;

    if (!webHookUrlRegex.test(webhookUrl)) {
      throw new InvalidWebhookUrlException('The webhook url is invalid.');
    }

    const webhookUrlParts = webhookUrl.split('/');
    const webhookIdString = webhookUrlParts[webhookUrlParts.length - 2];
    const webhookTokenString = webhookUrlParts[webhookUrlParts.length - 1];
    const webhookId = DiscordId.create(webhookIdString);
    const notificationTarget = new NotificationTarget({ webhookId, webhookToken: webhookTokenString, isInvalid });
    return notificationTarget;
  }

  public get webhookId(): DiscordId { return this.props.webhookId; }
  public get webhookToken(): string { return this.props.webhookToken; }
  public get isInvalid(): boolean { return this.props.isInvalid; }
} 