import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorsource } from '../types/Monitorsource';

const dbProvider = Container.get(DatabaseProvider);

export namespace MonitorsourceModel {
  export async function GetMonitorsource({ id }: { id: string }): Promise<Monitorsource> {
    let result = await dbProvider.Get('lsb.monitorsources', { id });
    return result.Item as Monitorsource;
  }

  export async function GetMonitorsources({ monitorId }: { monitorId: string }): Promise<Array<Monitorsource>> {
    let result = await dbProvider.Find('lsb.monitorsources', "monitorId = :monitorId", { ":monitorId": monitorId }, "monitorId-index");
    return result.Items as Array<Monitorsource>;
  }

  export async function CreateMonitorsource({ id, monitorId, productId, monitorpageId, all }: { id: string, monitorId: string, productId: string, monitorpageId: string, all: boolean }): Promise<Monitorsource> {
    await dbProvider.Insert('lsb.monitorsources', { id, monitorId, productId, monitorpageId, all });
    let result = await dbProvider.Get('lsb.monitorsources', { id });
    return result.Item as Monitorsource;
  }

  export async function DeleteMonitorsource({ id }: { id: string }) {
    await dbProvider.Delete('lsb.monitorsources', { id });
  }

  export async function IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.monitorsources', { id });
    return result.Item == null;
  }
}