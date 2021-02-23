import { Service } from 'typedi';
import { IResult } from '../types/IResult';
import { WebhookClient } from 'discord.js';

@Service()
export class DiscordService {
  private webhookClient: WebhookClient;

  async SendTestMessage({webHook, botName, botImage, role}: {webHook: string, botName: string, botImage: string, role: string}): Promise<IResult> {
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

      let message = 'Hello there!';

      if (role)
        message += `\n${role}`;

      this.webhookClient.send(message, {
        username: botName,
        avatarURL: botImage
      });
      return {success: true, data: {message: 'Send Message successfully'}}; 
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}