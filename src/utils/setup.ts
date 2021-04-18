import config, { ConfigSetup } from './config';
import { HttpSetup } from '../infra/http/app';
import { logger } from './logger';

export function Start() {
  logger.info(`Starting ConfigSetup...`);
  ConfigSetup();
  logger.info(`Finished ConfigSetup.`);

  logger.info(`Starting HttpSetup...`);
  HttpSetup();
  logger.info(`Finished HttpSetup.`);

  logger.info(`Application started in ${config.environment}.`);
}