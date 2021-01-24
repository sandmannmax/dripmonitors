import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitor } from '../types/Monitor';

export class MonitorModel {
  private dbProvider: DatabaseProvider;

  constructor(provider: DatabaseProvider) {
    this.dbProvider = provider;
  }

  async GetMonitors(): Promise<Array<Monitor>> {
    return await this.dbProvider.Find<Monitor>('monitors', {});
  }
}