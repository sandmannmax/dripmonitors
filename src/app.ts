import loaders from './loaders';
import config from './config'
import express from 'express';
import { Server } from 'http';

export async function startServer() {
  const app = express();
  
  await loaders(app);
  
  const server = new Server(app);
  server.listen(config.port, () => {
    console.log(`Server is running on Port ${config.port}`);
  })
}