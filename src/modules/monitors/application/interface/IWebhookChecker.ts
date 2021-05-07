import { DiscordWebhook } from "../../../../core/base/DiscordWebhook";
import { WebhookPropertiesDTO } from "../dto/WebhookPropertiesDTO";

export interface IWebhookChecker {
  getWebhookProperties(webhook: DiscordWebhook): Promise<WebhookPropertiesDTO>;
}