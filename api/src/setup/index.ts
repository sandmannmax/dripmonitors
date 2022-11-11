import { ConfigSetup } from '../config';
import { DatabaseSetup } from './database';
import { StartServer } from './app';

export async function Start() {
  ConfigSetup();
  await DatabaseSetup();
  StartServer();
}