import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Urlelement } from '../types/Urlelement';

export class UrlelementModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  async GetUrlelement({ id }: { id: string }): Promise<Urlelement> {
    let result = await this.dbProvider.Get('lsb.urlelements', { id });
    return result.Item as Urlelement;
  }

  async GetUrlelements({ monitorpageId }: { monitorpageId: string }): Promise<Array<Urlelement>> {
    let result = await this.dbProvider.Find('lsb.urlelements', "monitorpageId = :monitorpageId", { ":monitorpageId": monitorpageId }, "monitorpageId-index");
    return result.Items as Array<Urlelement>;
  }
  
  async InsertUrlelement({ id, url, monitorpageId }: { id: string, url: string, monitorpageId: string }): Promise<Urlelement> {
    await this.dbProvider.Insert('lsb.urlelements', { id, url, monitorpageId });
    let result = await this.dbProvider.Get('lsb.urlelements', { id });
    return result.Item as Urlelement;
  }

  async UpdateUrl({ id, url }: { id: string, url: string }): Promise<void> {
    await this.dbProvider.Update('lsb.urlelements', { id }, "set #u = :url", { ':url': url }, null, { '#u': 'url' });
  }

  async DeleteUrlelement({ id }: { id: string }): Promise<void> {
    await this.dbProvider.Delete('lsb.urlelements', { id });
  }

  async IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.urlelements', { id });
    return result.Item == null;
  }
}