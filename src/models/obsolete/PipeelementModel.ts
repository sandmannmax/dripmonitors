import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Pipeelement } from '../types/Pipeelement';

export class PipeelementModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  async GetPipeelement({ id }: { id: string }): Promise<Pipeelement> {
    let result = await this.dbProvider.Get('lsb.pipeelements', { id });
    return result.Item as Pipeelement;
  }

  async GetPipeelements({ processconfigId }: { processconfigId: string }): Promise<Array<Pipeelement>> {
    let result = await this.dbProvider.Find('lsb.pipeelements', "processconfigId = :processconfigId", { ":processconfigId": processconfigId }, "processconfigId-index");
    let items = result.Items as Array<Pipeelement>;
    items.sort((a, b) => a.order - b.order);
    return items;
  }
  
  async InsertPipeelement({ id, processconfigId, command, order }: { id: string, processconfigId: string, command: string, order: number }): Promise<Pipeelement> {
    await this.dbProvider.Insert('lsb.pipeelements', { id, processconfigId, command, order });
    let result = await this.dbProvider.Get('lsb.pipeelements', { id });
    return result.Item as Pipeelement;
  }

  async UpdateCommand({ id, command }: { id: string, command: string }): Promise<void> {
    await this.dbProvider.Update('lsb.pipeelements', { id }, "set command = :command", { ':command': command });
  }

  async UpdateOrder({ id, order }: { id: string, order: number }): Promise<void> {
    await this.dbProvider.Update('lsb.pipeelements', { id }, "set #ord = :order", { ':order': order }, null, { '#ord': 'order' });
  }

  async DeletePipeelement({ id }: { id: string }): Promise<void> {
    await this.dbProvider.Delete('lsb.pipeelements', { id });
  }

  async IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.pipeelements', { id });
    return result.Item == null;
  }
}