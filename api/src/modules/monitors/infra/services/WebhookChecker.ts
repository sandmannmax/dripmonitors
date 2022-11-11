import { WebhookPropertiesDTO } from "../../application/dto/WebhookPropertiesDTO";
import { IWebhookChecker } from "../../application/interface/IWebhookChecker";
import fetch from 'node-fetch';
import { DiscordWebhook } from "../../../../core/base/DiscordWebhook";

export class WebhookChecker implements IWebhookChecker {
  public async getWebhookProperties(webhook: DiscordWebhook): Promise<WebhookPropertiesDTO> {
    try {
      const response = await fetch(webhook.toString());
      if (response.ok) {
        const responseContent = await response.json();
        const serverId = responseContent.guild_id;
        return { isExisting: true, serverId };
      }
    } catch { }
    return { isExisting: false };
  }
}