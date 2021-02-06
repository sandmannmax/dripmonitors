import { MonitorModel } from '../../src/models/MonitorModel';
import { Monitor } from '../../src/types/Monitor';

export class FakeMonitorModel extends MonitorModel {

  private static monitorArray: Array<Monitor> = []; // [{ id: '4321', userId: '1234', webHook: '', botName: '', botImage: '', running: false }]

  GetMonitor = async function ({ id }: { id: string }): Promise<Monitor> {
    return FakeMonitorModel.monitorArray.find(item => item.id === id);
  }

  GetMonitors = async function ({ userId }: {userId: string}): Promise<Array<Monitor>> {
    return FakeMonitorModel.monitorArray.filter(item => item.userId === userId);
  }

  CreateMonitor = async function ({ id, userId }: { id: string, userId: string }): Promise<Monitor> {
    FakeMonitorModel.monitorArray.push({ id, userId, webHook: '', botName: '', botImage: '', running: false } )
    return FakeMonitorModel.monitorArray.find(item => item.id === id);
  }

  DeleteMonitor = async function ({ id }: { id: string }) {}

  UpdateBotImage = async function ({ id, botImage}: { id: string, botImage: string }) {
    FakeMonitorModel.monitorArray[FakeMonitorModel.monitorArray.findIndex(item => item.id === id)].botImage = botImage;
  }

  UpdateBotName = async function ({ id, botName}: { id: string, botName: string }) {
    FakeMonitorModel.monitorArray[FakeMonitorModel.monitorArray.findIndex(item => item.id === id)].botName = botName;
  }

  UpdateWebhook = async function ({ id, webHook}: { id: string, webHook: string }) {
    FakeMonitorModel.monitorArray[FakeMonitorModel.monitorArray.findIndex(item => item.id === id)].webHook = webHook;
  }

  UpdateRunning = async function ({ id, running}: { id: string, running: boolean }) {
    FakeMonitorModel.monitorArray[FakeMonitorModel.monitorArray.findIndex(item => item.id === id)].running = running;
  }

  GetRoleMonitorCount = async function (role: string) {
    return 1;
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    return FakeMonitorModel.monitorArray.findIndex(item => item.id === id) == -1;
  }
}