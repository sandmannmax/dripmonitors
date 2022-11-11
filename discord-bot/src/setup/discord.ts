import { Client, MessageEmbed, TextChannel } from 'discord.js';
import config from '../config';
import { Accesskey } from '../models/Accesskey';
import pino from 'pino';

const logger = pino();

export function DiscordSetup() {

  const client = new Client();

  client.on('ready', async () => {
    logger.info('Bot is running.');

    const guild = await client.guilds.fetch('781477776737173544');
    const channel = <TextChannel>guild.channels.cache.get('823640444922495028');

    if (!channel)
      return;

    await channel.messages.fetch();    
  });

  client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot)
      return;

    if (reaction.message.channel.id != '823640444922495028')
      return;

    if (reaction.emoji.name != '🔑')
      return

    let userId = user.id;

    let keys = await Accesskey.findAll({ where: { userId }});

    if (keys && keys.length > 0) {
      user.send('Nice try! You can only claim 1 Beta Key!')
      return;
    }

    let key = await Accesskey.create({ isBetakey: true, userId });

    user.send(`Here is your 🔑\n${key.id}`);
  });

  client.login(config.bot_token);
}