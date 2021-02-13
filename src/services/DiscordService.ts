import { MessageEmbed, WebhookClient } from 'discord.js';
import { Monitor } from '../types/Monitor';
import { Product } from '../types/Product';

export namespace DiscordService {

  export async function SendMessage({ monitors, product, size, page }: {monitors: Array<Monitor>, product: Product, size: string, page: string}) {
    monitors.forEach(monitor => {
      try {
        if (!monitor.botName)
          monitor.botName = 'Lazy Monitor';
  
        if (!monitor.botImage)
          monitor.botImage = 'https://lazyshoebot.com/logoWide.png';
  
        let webHookStrings = monitor.webHook.split('/');
        let id = webHookStrings[webHookStrings.length-2];
        let token = webHookStrings[webHookStrings.length-1];
        let webhookClient = new WebhookClient(id, token);
  
        let colors = ['#0099ff', '#aaee99', '#aaee77', '#d0d000'];
        let index = Math.floor(Math.random() * colors.length);
  
        let message: MessageEmbed = new MessageEmbed()
          .setColor(colors[index])
          .setTitle(product.name)
          .setThumbnail(product.img)
          .setURL(product.href)
          .setDescription(`**Page:** ${page}\n**Price:** ${product.price}\n**Size:** ${size}`)
          .setTimestamp()
          .setFooter('Powered by LazyShoeBot - Still in Beta', 'http://lazyshoebot.com/logoWide.png');
        
        webhookClient.send({
          embeds: [message],
          username: monitor.botName,
          avatarURL: monitor.botImage
        });
      } catch (error) {
      }
    });    
  }
}