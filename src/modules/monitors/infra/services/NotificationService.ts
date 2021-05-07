import { Embed, INotificationService, NotificationCommand } from "../../../monitormanagement/application/interfaces/INotificationService";
import { MessageEmbed, WebhookClient } from 'discord.js';
import { logger } from "../../../../utils/logger";

export class NotificationService implements INotificationService {
  public async notify(command: NotificationCommand): Promise<void> {
    const webhookClient = new WebhookClient(command.webhookId, command.webhookToken);

    const embeds = this.embedsToMessageEmbeds(command.embeds);

    try {
      await webhookClient.send(command.message, {
        embeds,
        username: command.senderName,
        avatarURL: command.senderImg,
      });
    } catch (error) {
      logger.error(`Error in DiscordService: ${JSON.stringify(error)}`);
    }
  }

  private embedsToMessageEmbeds(embeds: Embed[]): MessageEmbed[] {
    const messageEmbeds: MessageEmbed[] = [];

    for (let i = 0; i < embeds.length; i++) {
      const embed = embeds[i];
      let messageEmbed: MessageEmbed = new MessageEmbed()
        .setColor(embed.color)
        .setTitle(embed.title)
        .setThumbnail(embed.thumbnail)
        .setURL(embed.url)
        .setFooter(embed.footerText, embed.footerImg);

      for (let j = 0; j < embed.fields.length; j++) {
        messageEmbed = messageEmbed.addField(embed.fields[j].name, embed.fields[j].value);
      }

      messageEmbeds.push(messageEmbed);
    }

    return messageEmbeds;
  }
}