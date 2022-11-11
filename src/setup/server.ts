import { Server, ServerCredentials } from '@grpc/grpc-js';
import { ProxyServiceServer } from '../server';
import { ProxyServiceService } from '../proto/proxy/v1/proxy_grpc_pb';
import { logger } from '../logger';
import config from '../config';

const shutdownCallback = (error) => {
  if (error) {
    logger.error('Error while shutting down server: ' + error);
    process.exit(1);
  } else
    process.exit(0);
}

export default () => {
  const server = new Server();
  server.addService(ProxyServiceService, new ProxyServiceServer());
  server.bindAsync(`${config.host}:${config.port}`, ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      logger.error(error);
      return;
    }

    server.start();
    logger.info('Server is running on port ' + port);
  });
  
  process.on('SIGTERM', () => {
    server.tryShutdown(shutdownCallback);
  });
  process.on('SIGINT', () => {
    server.tryShutdown(shutdownCallback);
  });
}
