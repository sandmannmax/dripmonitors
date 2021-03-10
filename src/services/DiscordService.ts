import { Service } from 'typedi';
import { IResult } from '../types/IResult';
import { MessageEmbed, WebhookClient } from 'discord.js';
import { logger } from '../logger';
import { Monitor } from '../models/Monitor';
import { ProductScraped } from '../types/ProductScraped';

@Service()
export class DiscordService {
  private webhookClient!: WebhookClient;

  async SendTestMessage({ monitor }: { monitor: Monitor }): Promise<IResult> {
    try {      
      if (!monitor.botName)
        monitor.botName = 'LSB Monitor';

      let regex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')

      if (!monitor.botImage || !regex.test(monitor.botImage))
        monitor.botImage = 'https://lazyshoebot.com/logoWide.png';      

      let strings = monitor.webHook!.split('/');
      let id = strings[strings.length-2];
      let token = strings[strings.length-1];
      this.webhookClient = new WebhookClient(id, token);

      let message = 'Hello there!';

      if (monitor.roles)
        message += "\n" + monitor.roles.map(o => "<@&" + o.roleId + ">").join(' ');

      this.webhookClient.send(message, {
        username: monitor.botName,
        avatarURL: monitor.botImage
      });
      return {success: true, data: {message: 'Send Message successfully'}}; 
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async SendMessage({ monitors, product, size, page }: {monitors: Array<Monitor>, product: ProductScraped, size: string, page: string}) {
    monitors.forEach(monitor => {
      try {
        if (!monitor.botName)
          monitor.botName = 'Lazy Monitor';

        let regex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')

        if (!monitor.botImage || !regex.test(monitor.botImage))
        monitor.botImage = 'https://lazyshoebot.com/logoWide.png';
  
        let webHookStrings = monitor.webHook!.split('/');
        let id = webHookStrings[webHookStrings.length-2];
        let token = webHookStrings[webHookStrings.length-1];
        let webhookClient = new WebhookClient(id, token);
  
        let colors = ['#0099ff', '#aaee99', '#aaee77', '#d0d000'];
        let index = Math.floor(Math.random() * colors.length);

        let description = `**Page:** ${page}\n**Price:** ${product.price}`;

        if (size)
          description += `\n**Size:** ${size}`;

        let message;
        
        if (monitor.roles)
          message = monitor.roles.map(o => "<@&" + o.roleId + ">").join(' ');

        let embed: MessageEmbed = new MessageEmbed()
          .setColor(colors[index])
          .setTitle(product.name)
          .setDescription(description)
          .setTimestamp()
          .setFooter('Powered by LazyShoeBot - Still in Beta', 'http://lazyshoebot.com/logoWide.png');

        if (product.img)
          embed.setThumbnail(product.img);

        if (product.href)
          embed.setURL(product.href);
        
        webhookClient.send(message, {
          embeds: [embed],
          username: monitor.botName,
          avatarURL: monitor.botImage
        });
      } catch (error) {
        logger.error(`Error in DiscordService with ${monitor.id} ${product.id}: ${JSON.stringify(error)}`);
      }
    });    
  }
}