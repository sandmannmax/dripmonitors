import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Product } from '../types/Product';

const dbProvider = DatabaseProvider.getInstance();

export class ProductModel {

  public static GetProduct = async function ({ id }: { id: string }) {
    let result = await dbProvider.Get('lsb.products', { id });
    return result.Item as Product;
  }

  public static AddProduct = async function ({ product, monitorpageId }: { product: Product, monitorpageId: string }) {
    product.monitorpageId = monitorpageId;
    await dbProvider.Insert('lsb.products', product.ToDBObject());
  }

  public static UpdateProduct = async function ({ product, monitorpageId }: { product: Product, monitorpageId: string }) {
    product.monitorpageId = monitorpageId;
    let update = product.ToDBUpdate();
    await dbProvider.Update('lsb.products', update.key, update.expression, update.values, null, update.names);
  }

}