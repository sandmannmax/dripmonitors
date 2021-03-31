import { MessageEmbed, WebhookClient } from 'discord.js';
import { Product } from '../types/Product';

export class DiscordService {
  export async function SendMessage({
    monitors,
    product,
    size,
    page,
  }: {
    monitors: Array<Monitor>;
    product: Product;
    size: string;
    page: string;
  }) {
    monitors.forEach((monitor) => {
      try {
        if (!monitor.botName) {
          monitor.botName = 'Lazy Monitor';
        }

        if (!monitor.botImage)
          monitor.botImage = 'https://lazyshoebot.com/logoWide.png';

        const webHookStrings = monitor.webHook.split('/');
        const id = webHookStrings[webHookStrings.length - 2];
        const token = webHookStrings[webHookStrings.length - 1];
        const webhookClient = new WebhookClient(id, token);

        const colors = ['#0099ff', '#aaee99', '#aaee77', '#d0d000'];
        const index = Math.floor(Math.random() * colors.length);

        let description = `**Page:** ${page}\n**Price:** ${product.price}`;

        if (size) {
          description += `\n**Size:** ${size}`;
        }

        let message;

        if (monitor.role) {
          message = monitor.role;
        }

        const embed: MessageEmbed = new MessageEmbed()
          .setColor(colors[index])
          .setTitle(product.name)
          .setThumbnail(product.img)
          .setURL(product.href)
          .setDescription(description)
          .setTimestamp()
          .setFooter(
            'Powered by LazyShoeBot - Still in Beta',
            'http://lazyshoebot.com/logoWide.png'
          );

        webhookClient.send(message, {
          embeds: [embed],
          username: monitor.botName,
          avatarURL: monitor.botImage,
        });
      } catch (error) {
        logger.error(
          `Error in DiscordService with ${monitor.id} ${
            product.id
          }: ${JSON.stringify(error)}`,
        );
      }
    });
  }
}
