import { MonitorModel } from '../../src/models/MonitorModel';
import { Monitor } from '../../src/types/Monitor';

export class FakeMonitorModel extends MonitorModel {


  GetMonitor = async function ({ id }: { id: string }): Promise<Monitor> {
    let result = await this.dbProvider.Get('lsb.monitors', { id });
    return result.Item as Monitor;
  }

  GetMonitors = async function ({ userId }: {userId: string}): Promise<Array<Monitor>> {
    return [];
  }

  CreateMonitor = async function ({ id, userId }: { id: string, userId: string }): Promise<Monitor> {
    await this.dbProvider.Insert('lsb.monitors', { id, userId, webHook: '', botName: '', botImage: '' });
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

  GetRoleMonitorCount = async function (role: string) {
    return (await this.dbProvider.Get('lsb.monitor_rolecount', { role })).Item; // TODO so nicht richtig
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitors', { id });
    return result.Item == null;
  }
}