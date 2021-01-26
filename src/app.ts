import loaders from './loaders';
import config from './config'
import express from 'express';
import { Server } from 'http';
import { logger } from './logger';

export async function startServer() {
  const app = express();
  
  await loaders(app);

  const server = new Server(app);
  const port = config.port || 6969;
  server.listen(port, () => {
    logger.info(`Server is running`, {port});
  })
}