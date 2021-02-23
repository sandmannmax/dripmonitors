import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitor } from '../types/Monitor';

export class MonitorModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  GetMonitor = async function ({ id }: { id: string }): Promise<Monitor> {
    let result = await this.dbProvider.Get('lsb.monitors', { id });
    return result.Item as Monitor;
  }

  GetMonitors = async function ({ userId }: {userId: string}): Promise<Array<Monitor>> {
    let result = await this.dbProvider.Find('lsb.monitors', "userId = :userId", { ":userId": userId }, "userId-index");
    return result.Items as Array<Monitor>;
  }

  CreateMonitor = async function ({ id, userId }: { id: string, userId: string }): Promise<Monitor> {
    await this.dbProvider.Insert('lsb.monitors', { id, userId, webHook: '', botName: '', botImage: '', running: false });
    let result = await this.dbProvider.Get('lsb.monitors', { id });
    return result.Item as Monitor;
  }

  DeleteMonitor = async function ({ id }: { id: string }) {
    await this.dbProvider.Delete('lsb.monitors', { id });
  }

  UpdateBotImage = async function ({ id, botImage}: { id: string, botImage: string }) {
    await this.dbProvider.Update('lsb.monitors', { id }, "set botImage = :botImage", { ":botImage": botImage });
  }

  UpdateBotName = async function ({ id, botName}: { id: string, botName: string }) {
    await this.dbProvider.Update('lsb.monitors', { id }, "set botName = :botName", { ":botName": botName });
  }

  UpdateWebhook = async function ({ id, webHook}: { id: string, webHook: string }) {
    await this.dbProvider.Update('lsb.monitors', { id }, "set webHook = :webHook", { ":webHook": webHook });
  }

  UpdateRunning = async function ({ id, running}: { id: string, running: boolean }) {
    await this.dbProvider.Update('lsb.monitors', { id }, "set running = :running", { ":running": running });
  }

  UpdateRole = async function ({ id, role }: { id: string, role: string }) {
    await this.dbProvider.Update('lsb.monitors', { id }, "set #r = :role", { ":role": role }, null, { '#r': 'role' });
  }

  GetRoleMonitorCount = async function (role: string) {
    return (await this.dbProvider.Get('lsb.monitor_rolecount', { role })).Item; // TODO so nicht richtig
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitors', { id });
    return result.Item == null;
  }
}