import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Processconfig } from '../types/Processconfig';

export class ProcessconfigModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  async GetProcessconfig ({ id }: { id: string }): Promise<Processconfig> {
    let result = await this.dbProvider.Get('lsb.processconfigs', { id });
    return result.Item as Processconfig;
  }

  async GetProcessconfigs ({ monitorpageconfigId }: { monitorpageconfigId: string }): Promise<Array<Processconfig>> {
    let result = await this.dbProvider.Find('lsb.processconfigs', "monitorpageconfigId = :monitorpageconfigId", { ":monitorpageconfigId": monitorpageconfigId }, "monitorpageconfigId-index");
    return result.Items as Array<Processconfig>;
  }
  
  async InsertProcessconfig ({ id, monitorpageconfigId, constant, hasConstant }: { id: string, monitorpageconfigId: string, constant: boolean, hasConstant: boolean }): Promise<Processconfig> {
    await this.dbProvider.Insert('lsb.processconfigs', { id, monitorpageconfigId, constant, hasConstant });
    let result = await this.dbProvider.Get('lsb.processconfigs', { id });
    return result.Item as Processconfig;
  }

  async UpdateConstant ({ id, constant }: { id: string, constant: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.processconfigs', { id }, "set constant = :constant", { ':constant': constant });
  }

  async UpdateHasConstant ({ id, hasConstant }: { id: string, hasConstant: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.processconfigs', { id }, "set hasConstant = :hasConstant", { ':hasConstant': hasConstant});
  }

  async DeleteProcessconfig ({ id }: { id: string }): Promise<void> {
    await this.dbProvider.Delete('lsb.processconfigs', { id });
  }

  async IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.processconfigs', { id });
    return result.Item == null;
  }
}