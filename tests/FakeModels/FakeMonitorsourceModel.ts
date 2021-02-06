import { MonitorsourceModel } from '../../src/models/MonitorsourceModel';
import { Monitorsource } from '../../src/types/Monitorsource';


export class FakeMonitorsourceModel extends MonitorsourceModel {

  private static monitorsourceArray: Array<Monitorsource> = [{ id: '4321', monitorId: '4321', productId: undefined, monitorpageId: undefined, all: true }]

  GetMonitorsource = async function ({ id }: { id: string }): Promise<Monitorsource> {
    return FakeMonitorsourceModel.monitorsourceArray.find(item => item.id === id);
  }

  GetMonitorsources = async function ({ monitorId }: { monitorId: string }): Promise<Array<Monitorsource>> {
    return FakeMonitorsourceModel.monitorsourceArray.filter(item => item.monitorId === monitorId);
  }

  CreateMonitorsource = async function ({ id, monitorId, productId, monitorpageId, all }: { id: string, monitorId: string, productId: string, monitorpageId: string, all: boolean }): Promise<Monitorsource> {
    FakeMonitorsourceModel.monitorsourceArray.push({ id, monitorId, productId, monitorpageId, all })
    return FakeMonitorsourceModel.monitorsourceArray.find(item => item.id === id);
  }

  DeleteMonitorsource = async function ({ id }: { id: string }) { }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    return FakeMonitorsourceModel.monitorsourceArray.findIndex(item => item.id === id) == -1;
  }
}