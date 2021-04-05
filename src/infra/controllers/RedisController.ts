import { RedisClient } from 'redis';
import { createNodeRedisClient, WrappedNodeRedisClient } from 'handy-redis';
import { IMonitorService } from '../../application/services/MonitorService';
import { logger } from '../../util/logger';
import { IsRunMonitorCommandDTO } from '../../application/dto/RunMonitorCommandDTO';

export class RedisController {
  private monitorService: IMonitorService;
  private client: WrappedNodeRedisClient;

  constructor({ client, monitorService }: { client: RedisClient, monitorService: IMonitorService }) {
    this.monitorService = monitorService;
    this.client = createNodeRedisClient(client);

    this.client.nodeRedis.on('ready', () => this.OnReady());
    this.client.nodeRedis.on('error', (error: string) => this.OnError(error));  
    this.client.nodeRedis.on('pmessage', (pattern: string, channel: string, message: string) => this.OnPMessage(pattern, channel, message));
  }

  private async OnReady() {
    await this.client.psubscribe(['monitor:*']);
    logger.info('Redis ready and set up.');
  }

  private OnError(error: string) {
    logger.error(error);
  }

  private OnPMessage(pattern: string, channel: string, message: string): void {
    if (pattern !== 'monitor:*') {
      return;
    }

    const splitName = channel.split(':');

    if (splitName.length !== 2) {
      logger.error(`Received channel is invalid: ${channel}`);
      return;
    }

    const name = splitName[1];

    if (!this.monitorService.checkMonitorAvailable(name)) {
      logger.error(`${name} is no defined monitor`);
      return;
    }

    let command;

    try {
      command = JSON.parse(message);
    } catch (e) {
      logger.error(`Error while parsing message from redis for ${name}: ${e.message}`);
      return;
    }

    if (!IsRunMonitorCommandDTO(command)) {
      logger.error('Received content is not of type RunMonitorCommandDTO.');
      return;
    }

    try {
      this.monitorService.runMonitor(name, command);
    } catch(e) {
      logger.error(JSON.stringify(e));
    }
  }
}
