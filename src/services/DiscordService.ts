import { MessageEmbed, WebhookClient } from 'discord.js';
import { Monitor } from '../types/Monitor';
import { Product } from '../types/Product';

export class DiscordService {
  private webhookClient: WebhookClient;

  async SendMessage({ monitor, product, page }: {monitor: Monitor, product: Product, page: string}) {
    try {
      if (!monitor.botName)
        monitor.botName = 'LSB Monitor';

      if (!monitor.botImage)
        monitor.botImage = 'http://lazyshoebot.com/logoWide.png';

      let size = '';
      for (let i = 0; i < product.sizes.length; i++) {
        if (!product.sizesSoldOut[i])
          size += product.sizes[i] + ' - '
      }
      size = size.substr(0, size.length - 3);

      let webHookStrings = monitor.webHook.split('/');
      let id = webHookStrings[webHookStrings.length-2];
      let token = webHookStrings[webHookStrings.length-1];
      this.webhookClient = new WebhookClient(id, token);

      let colors = ['#0099ff', '#aaee99', '#aaee77', '#d0d000'];
      let index = Math.floor(Math.random() * colors.length);

      let message: MessageEmbed = new MessageEmbed()
        .setColor(colors[index])
        .setTitle(product.name)
        .setThumbnail(product.img)
        .setURL(product.href)
        .setDescription(`**Page:** ${page}\n**Price:** ${product.price}\n**Size:** ${size}`)
        .setTimestamp()
        .setFooter('Powered by LazyShoeBot', 'http://lazyshoebot.com/logoWide.png');
      
      this.webhookClient.send({
        embeds: [message],
        username: monitor.botName,
        avatarURL: monitor.botImage
      });
    } catch (error) {
    }
  }
}