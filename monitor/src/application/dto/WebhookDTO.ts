import { NotificationTargetDTO } from "./NotificationTargetDTO";

export interface WebhookDTO extends NotificationTargetDTO {
  webhookId: string;
  webhookToken: string;
}

export function IsWebhookDTO(object: any) {
  return 'webhookId' in object && typeof object.webhookId == 'string' && 'webhookToken' in object && typeof object.webhookToken == 'string';
}