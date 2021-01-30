import { Service } from 'typedi';
import { IResult } from '../types/IResult';

import { MessageEmbed, WebhookClient } from 'discord.js';

@Service()
export class DiscordService {
  private webhookClient: WebhookClient;

  async SendTestMessage({webHook, botName, botImage}: {webHook: string, botName: string, botImage: string}): Promise<IResult> {
    try {      
      if (!botName)
        botName = 'LSB Monitor';

      let regex = new RegExp('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})')

      if (!botImage || !regex.test(botImage))
        botImage = 'https://lazyshoebot.com/logoWide.png';

      let strings = webHook.split('/');
      let id = strings[strings.length-2];
      let token = strings[strings.length-1];
      this.webhookClient = new WebhookClient(id, token);

      this.webhookClient.send('Hello there!', {
        username: botName,
        avatarURL: botImage
      });
      return {success: true, data: {message: 'Send Message successfully'}};  
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}