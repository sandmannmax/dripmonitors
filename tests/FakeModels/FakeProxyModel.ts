import { ProxyModel } from '../../src/models/ProxyModel';
import { Proxy } from '../../src/types/Proxy';

export class FakeProxyModel extends ProxyModel {

  private static proxyArray: Array<Proxy> = [{ id: '4321', address: 'https://localhost:69', cc: 'DE' }]

  GetProxy = async function ({ id }: { id: string }): Promise<Proxy> {
    return FakeProxyModel.proxyArray.find(item => item.id === id);
  }

  GetProxies = async function (): Promise<Array<Proxy>> {
    return FakeProxyModel.proxyArray;
  }

  IsProxyUnused = async function ({ address }: { address: string }): Promise<boolean> {
    return FakeProxyModel.proxyArray.findIndex(item => item.address === address) === -1;
  }

  CreateProxy = async function ({ id, address, cc }: { id: string, address: string, cc: string }): Promise<Proxy> {
    FakeProxyModel.proxyArray.push({ id, address, cc });
    return FakeProxyModel.proxyArray.find(item => item.id === id);
  }

  DeleteProxy = async function ({ id }: { id: string }) { }

  UpdateProxy = async function ({ id, address, cc }: { id: string, address: string, cc: string }) {
    FakeProxyModel.proxyArray[FakeProxyModel.proxyArray.findIndex(item => item.id === id)].address = address;
    FakeProxyModel.proxyArray[FakeProxyModel.proxyArray.findIndex(item => item.id === id)].cc = cc;
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    return FakeProxyModel.proxyArray.findIndex(item => item.id === id) === -1;
  }
}