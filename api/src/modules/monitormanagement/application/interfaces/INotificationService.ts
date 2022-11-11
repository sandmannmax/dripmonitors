export interface Embed {
  color: string;
  footerText: string;
  footerImg: string;
  title: string;
  thumbnail: string;
  url: string;
  fields: { name: string, value: string }[];
}

export interface NotificationCommand {
  webhookId: string;
  webhookToken: string;
  senderName: string;
  senderImg: string;
  message: string | null;
  embeds: Embed[];
}

export interface INotificationService {
  notify(command: NotificationCommand): Promise<void>;
}