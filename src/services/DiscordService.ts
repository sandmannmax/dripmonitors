import { Service } from 'typedi';
import { IResult } from '../types/IResult';
import { MessageEmbed, WebhookClient } from 'discord.js';
import pino from 'pino';
import { Monitor } from '../models/Monitor';
import { ProductScraped } from '../types/ProductScraped';

@Service()
export class DiscordService {
  private webhookClient!: WebhookClient;
  private logger: pino.Logger;

  constructor() {
    this.logger = pino();
  }

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

      if (token.indexOf('?') != -1) {
        strings = token.split('?');
        token = strings[0];
      }

      this.webhookClient = new WebhookClient(id, token);

      let message = 'Hello there!';

      let roles = await monitor.getRoles();

      if (roles)
        message += "\n" + roles.map(o => "<@&" + o.roleId + ">").join(' ');

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
    for (let i = 0; i < monitors.length; i++) {
      let monitor = monitors[i];
      try {
        if (!monitor.botName)
          monitor.botName = 'Lazy Monitor';

        let regex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')

        if (!monitor.botImage || !regex.test(monitor.botImage))
          monitor.botImage = 'https://lazyshoebot.com/logoWide.png';
  
        let webHookStrings = monitor.webHook!.split('/');
        let id = webHookStrings[webHookStrings.length-2];
        let token = webHookStrings[webHookStrings.length-1];

        if (token.indexOf('?') != -1) {
          webHookStrings = token.split('?');
          token = webHookStrings[0];
        }

        let webhookClient = new WebhookClient(id, token);
  
        let colors = ['#0099ff', '#aaee99', '#aaee77', '#d0d000'];
        let index = Math.floor(Math.random() * colors.length);

        let description = `**Page:** ${page}\n**Price:** ${product.price}`;

        if (size)
          description += `\n**Size:** ${size}`;

        let message;

        let roles = await monitor.getRoles();

        if (roles)
          message = roles.map(o => "<@&" + o.roleId + ">").join(' ');

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
        this.logger.error(`Error in DiscordService with ${monitor.id} ${product.id}: ${JSON.stringify(error)}`);
      }
    }  
  }
}