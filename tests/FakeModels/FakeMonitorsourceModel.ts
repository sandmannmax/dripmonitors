import { Monitorsource } from '../../src/types/Monitorsource';


export class MonitorsourceModel {

  GetMonitorsource = async function ({ id }: { id: string }): Promise<Monitorsource> {
    let result = await this.dbProvider.Get('lsb.monitorsources', { id });
    return result.Item as Monitorsource;
  }

  GetMonitorsources = async function ({ monitorId }: { monitorId: string }): Promise<Array<Monitorsource>> {
    let result = await this.dbProvider.Find('lsb.monitorsources', "monitorId = :monitorId", { ":monitorId": monitorId }, "monitorId-index");
    return result.Items as Array<Monitorsource>;
  }

  CreateMonitorsource = async function ({ id, monitorId, productId, monitorpageId, all }: { id: string, monitorId: string, productId: string, monitorpageId: string, all: boolean }): Promise<Monitorsource> {
    await this.dbProvider.Insert('lsb.monitorsources', { id, monitorId, productId, monitorpageId, all });
    let result = await this.dbProvider.Get('lsb.monitorsources', { id });
    return result.Item as Monitorsource;
  }

  DeleteMonitorsource = async function ({ id }: { id: string }) {
    await this.dbProvider.Delete('lsb.monitorsources', { id });
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitorsources', { id });
    return result.Item == null;
  }
}