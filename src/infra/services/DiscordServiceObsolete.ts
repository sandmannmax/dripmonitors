import { MessageEmbed, WebhookClient } from 'discord.js';
import { NotifySubjectDTO } from '../../application/dto/NotifySubjectDTO';
import { IsWebhookDTO, WebhookDTO } from '../../application/dto/WebhookDTO';
import { INotificationService } from '../../application/interface/INotificationService';
import { logger } from '../../util/logger';

export class DiscordService {
  async notify(subject: NotifySubjectDTO, targets: WebhookDTO[]): Promise<void> {
    for (let i = 0; i < targets.length; i++) {
      let target = targets[i];

      if (IsWebhookDTO(target)) {
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

        if (subject.hasATC == true) {
          for (let i = 0; i < subject.sizes.length; i++) {
            embed = embed.addField(subject.sizes[i].value, '[[ATC]](' + subject.sizes[i].atc + ')');
          }
        } else {
          let sizes = '';

          for (let i = 0; i < subject.sizes.length; i++) {
            sizes += subject.sizes[i].value;
            if (i != subject.sizes.length - 1) {
              sizes += ' - '
            }
          }

          embed = embed.addField('Sizes', sizes);
        }

        try {
          await webhookClient.send(message, {
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