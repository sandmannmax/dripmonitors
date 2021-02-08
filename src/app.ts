import expressSetup from './setup/express';
import config from './config'
import express from 'express';
import { Server } from 'http';
import { logger } from './logger';

export function getApp() {
  const app = express();  
  expressSetup(app);
  return app;
}

export async function startServer() {  
  const app = await getApp();

  const server = new Server(app);
  server.listen(config.port, () => {
    logger.info(`Server is running on Port ${config.port}`);
  });
}