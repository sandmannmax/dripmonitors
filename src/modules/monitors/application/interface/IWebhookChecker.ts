import { WebhookPropertiesDTO } from "../dto/WebhookPropertiesDTO";

export interface IWebhookChecker {
  getWebhookProperties(webhookUrl: string): Promise<WebhookPropertiesDTO>;
}