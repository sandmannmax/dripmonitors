import { Proxy } from '../../types/Proxy';

export interface IProxyModel {
  GetProxy({ id }: { id: string }): Promise<Proxy>;

  GetProxies(): Promise<Array<Proxy>>;

  CreateProxy({ id, address, cc }: { id: string, address: string, cc: string }): Promise<Proxy>;

  UpdateProxy({ id, address, cc }: { id: string, address: string, cc: string }): Promise<void>;
  
  DeleteProxy({ id }: { id: string }): Promise<void>;

  IsProxyUnused({ address }: { address: string }): Promise<boolean>;

  IdUnused({ id }: { id: string }): Promise<boolean>;
}