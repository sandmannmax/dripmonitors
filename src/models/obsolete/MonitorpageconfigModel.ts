import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Monitorpageconfig } from '../types/Monitorpageconfig';

export class MonitorpageconfigModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  async GetMonitorpageconfig({ id }): Promise<Monitorpageconfig> {
    let result = await this.dbProvider.Get('lsb.monitorpageconfigs', { id });
    return result.Item as Monitorpageconfig;
  }

  async GetMonitorpageconfigs(): Promise<Array<Monitorpageconfig>> {
    let result = await this.dbProvider.GetAll('lsb.monitorpageconfigs');
    return result.Items as Array<Monitorpageconfig>;
  }
  
  async InsertMonitorpageconfig({ id, isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts, productsConfigId, idConfigId, nameConfigId, hrefConfigId, imgConfigId, priceConfigId, activeConfigId, soldOutConfigId, hasSizesConfigId, sizesConfigId, sizesSoldOutConfigId, childProductConfigId }: { id: string, isHtml: boolean, allSizesAvailable: boolean, soldOutCheckSizes: boolean, hasParentProducts: boolean, hasChildProducts: boolean, productsConfigId: string, idConfigId: string, nameConfigId: string, hrefConfigId: string, imgConfigId: string, priceConfigId: string, activeConfigId: string, soldOutConfigId: string, hasSizesConfigId: string, sizesConfigId: string, sizesSoldOutConfigId: string, childProductConfigId: string  }): Promise<Monitorpageconfig> {
    await this.dbProvider.Insert('lsb.monitorpageconfigs', { id, isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts, productsConfigId, idConfigId, nameConfigId, hrefConfigId, imgConfigId, priceConfigId, activeConfigId, soldOutConfigId, hasSizesConfigId, sizesConfigId, sizesSoldOutConfigId, childProductConfigId });
    let result = await this.dbProvider.Get('lsb.monitorpageconfigs', { id });
    return result.Item as Monitorpageconfig;
  }

  async UpdateIsHtml({ id, isHtml }: { id: string, isHtml: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpageconfigs', { id }, "set isHtml = :isHtml", { ':isHtml': isHtml });
  }

  async UpdateAllSizesAvailable({ id, allSizesAvailable }: { id: string, allSizesAvailable: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpageconfigs', { id }, "set allSizesAvailable = :allSizesAvailable", { ':allSizesAvailable': allSizesAvailable });
  }

  async UpdateSoldOutCheckSizes({ id, soldOutCheckSizes }: { id: string, soldOutCheckSizes: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpageconfigs', { id }, "set soldOutCheckSizes = :soldOutCheckSizes", { ':soldOutCheckSizes': soldOutCheckSizes });
  }

  async UpdateHasParentProducts({ id, hasParentProducts }: { id: string, hasParentProducts: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpageconfigs', { id }, "set hasParentProducts = :hasParentProducts", { ':hasParentProducts': hasParentProducts });
  }

  async UpdateHasChildProducts({ id, hasChildProducts }: { id: string, hasChildProducts: boolean }): Promise<void> {
    await this.dbProvider.Update('lsb.monitorpageconfigs', { id }, "set hasChildProducts = :hasChildProducts", { ':hasChildProducts': hasChildProducts });
  }

  async DeleteMonitorpageconfig({ id }: { id: string }): Promise<void> {
    await this.dbProvider.Delete('lsb.monitorpageconfigs', { id });
  }

  async IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.monitorpageconfigs', { id });
    return result.Item == null;
  }
}