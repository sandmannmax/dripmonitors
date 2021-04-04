import { MessageEmbed, WebhookClient } from 'discord.js';
import { ChannelDTO, IsChannelDTO } from '../../application/dto/ChannelDTO';
import { NotifySubjectDTO } from '../../application/dto/NotifySubjectDTO';
import { IsWebhookDTO, WebhookDTO } from '../../application/dto/WebhookDTO';
import { INotificationService } from '../../application/interface/INotificationService';
import { logger } from '../../util/logger';

export class DiscordService implements INotificationService {
  notify(subject: NotifySubjectDTO, targets: ChannelDTO[] | WebhookDTO[]): void {
    for (let i = 0; i < targets.length; i++) {
      let target = targets[i];

      if (IsChannelDTO(target)) {
        target = target as ChannelDTO;
        logger.warn('NotificationService with ChannelDTO is not implemented yet!');
      } else if (IsWebhookDTO(target)) {
        target = target as WebhookDTO;
        const webhookClient = new WebhookClient(target.webhookId, target.webhookToken);
        let name = target.name;
        let img = target.img;

        if (!name) {
          name = 'Lazy Monitor';
        }

        if (!img) {
          img = 'https://www.lazyshoebot.com/logoWide.png';
        }

        const color = '#db3e3e';
        let message;

        if (target.roles) {
          message = target.roles.map(roleId => "<@&" + roleId + ">").join(' ');
        }

        let embed: MessageEmbed = new MessageEmbed()
          .setColor(color)
          .setTitle(subject.name)
          .setThumbnail(subject.img)
          .setURL(subject.href)
          .setTimestamp()
          .setFooter(
            'Powered by LazyShoeBot - Still in Beta',
            'https://www.lazyshoebot.com/logoWide.png'
          );

        embed = embed.addField('Price', subject.price);

        let sizes = '';

        for (let i = 0; i < subject.sizes.length; i++) {
          sizes += subject.sizes[i];
          if (i != subject.sizes.length - 1) {
            sizes += ' - '
          }
        }

        embed = embed.addField('Sizes', sizes);

        try {
          webhookClient.send(message, {
            embeds: [embed],
            username: name,
            avatarURL: img,
          });
        } catch (error) {
          logger.error(`Error in DiscordService: ${JSON.stringify(error)}`);
        }
      } else {
        logger.error('Target can\'t be notified.');
      }
    }
  }
}