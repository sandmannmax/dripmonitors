export interface UpdateWebhookCommandDTO { 
  userDiscordId: string;
  serverUuid: string;
  monitorUuid: string;
  webhook: string;
}