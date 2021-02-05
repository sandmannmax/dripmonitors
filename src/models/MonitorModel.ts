import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitor } from '../types/Monitor';

const dbProvider = Container.get(DatabaseProvider);

export namespace MonitorModel {

  export async function GetMonitor({ id }: { id: string }): Promise<Monitor> {
    let result = await dbProvider.Get('lsb.monitors', { id });
    return result.Item as Monitor;
  }

  export async function GetMonitors({ userId }: {userId: string}): Promise<Array<Monitor>> {
    let result = await dbProvider.Find('lsb.monitors', "userId = :userId", { ":userId": userId }, "userId-index");
    return result.Items as Array<Monitor>;
  }

  export async function CreateMonitor({ id, userId }: { id: string, userId: string }): Promise<Monitor> {
    await dbProvider.Insert('lsb.monitors', { id, userId, webHook: '', botName: '', botImage: '' });
    let result = await dbProvider.Get('lsb.monitors', { id });
    return result.Item as Monitor;
  }

  export async function DeleteMonitor({ id }: { id: string }) {
    await dbProvider.Delete('lsb.monitors', { id });
  }

  export async function UpdateBotImage({ id, botImage}: { id: string, botImage: string }) {
    await dbProvider.Update('lsb.monitors', { id }, "set botImage = :botImage", { ":botImage": botImage });
  }

  export async function UpdateBotName({ id, botName}: { id: string, botName: string }) {
    await dbProvider.Update('lsb.monitors', { id }, "set botName = :botName", { ":botName": botName });
  }

  export async function UpdateWebhook({ id, webHook}: { id: string, webHook: string }) {
    await dbProvider.Update('lsb.monitors', { id }, "set webHook = :webHook", { ":webHook": webHook });
  }

  export async function UpdateRunning({ id, running}: { id: string, running: boolean }) {
    await dbProvider.Update('lsb.monitors', { id }, "set running = :running", { ":running": running });
  }

  export async function GetRoleMonitorCount(role: string) {
    return await (await dbProvider.Get('lsb.monitor_rolecount', { role })).Item; // TODO so nicht richtig
  }

  export async function IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.monitors', { id });
    return result.Item == null;
  }
}