import { ConfigSetup } from '../config';
import { DatabaseSetup } from './database';
import { DiscordSetup } from './discord';

export async function Start() {
  ConfigSetup();
  await DatabaseSetup();
  DiscordSetup();
}