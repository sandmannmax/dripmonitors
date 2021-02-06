import { MonitorpageModel } from '../../src/models/MonitorpageModel';
import { Monitorpage } from '../../src/types/Monitorpage';


export class FakeMonitorpageModel extends MonitorpageModel {

  private static monitorpageArray: Array<Monitorpage> = [{ id: '4321', name: 'nike', techname: 'nike', visible: false, running: false, interval: undefined, url: 'https://nike.com' }]

  GetMonitorpageVisible = async function ({ id }: { id: string }): Promise<Monitorpage> {
    return FakeMonitorpageModel.monitorpageArray.find(item => item.id === id && item.visible === true);
  }

  GetMonitorpagesVisible = async function (): Promise<Array<Monitorpage>> {
    return FakeMonitorpageModel.monitorpageArray.filter(item => item.visible === true);
  }

  GetMonitorpage = async function ({ id }: { id: string }): Promise<Monitorpage> {
    return FakeMonitorpageModel.monitorpageArray.find(item => item.id === id);
  }

  GetMonitorpages = async function (): Promise<Array<Monitorpage>> {
    return FakeMonitorpageModel.monitorpageArray;
  }

  CreateMonitorpage = async function ({ id, techname, name, url, visible }: { id: string, techname: string, name: string, url: string, visible: boolean }): Promise<Monitorpage> {    
    FakeMonitorpageModel.monitorpageArray.push({ id, name, techname, visible, running: false, interval: undefined, url })
    return FakeMonitorpageModel.monitorpageArray.find(item => item.id === id);
  }

  DeleteMonitorpage = async function ({ id }: { id: string }) { }

  UpdateTechname = async function ({ id, techname }: { id: string, techname: string }) {
    FakeMonitorpageModel.monitorpageArray[FakeMonitorpageModel.monitorpageArray.findIndex(item => item.id === id)].techname = techname;
  }

  UpdateName = async function ({ id, name }: { id: string, name: string }) {
    FakeMonitorpageModel.monitorpageArray[FakeMonitorpageModel.monitorpageArray.findIndex(item => item.id === id)].name = name;
  }

  UpdateVisible = async function ({ id, visible }: { id: string, visible: boolean }) {
    FakeMonitorpageModel.monitorpageArray[FakeMonitorpageModel.monitorpageArray.findIndex(item => item.id === id)].visible = visible;
  }

  UpdateUrl = async function ({ id, url }: { id: string, url: string }) {
    FakeMonitorpageModel.monitorpageArray[FakeMonitorpageModel.monitorpageArray.findIndex(item => item.id === id)].url = url;
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    return FakeMonitorpageModel.monitorpageArray.findIndex(item => item.id === id) == -1;
  }
}