import { MessageEmbed, WebhookClient } from 'discord.js';
import { logger } from '../../../../utils/logger';
import { INotificationService, NotificationCommand } from '../../application/interfaces/INotificationService';

export class DiscordService implements INotificationService {
  async notify(command: NotificationCommand): Promise<void> {
    const webhookClient = new WebhookClient(command.webhookId, command.webhookToken);
    const embeds: MessageEmbed[] = [];

    command.embeds.forEach(embed => {
      let messageEmbed = new MessageEmbed()
        .setColor(embed.color)
        .setTitle(embed.title)
        .setThumbnail(embed.thumbnail)
        .setURL(embed.url)
        .setFooter(embed.footerText, embed.footerImg);

      embed.fields.forEach(f => {
        messageEmbed = messageEmbed.addField(f.name, f.value);
      });
    
      embeds.push(messageEmbed);
    });

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
}