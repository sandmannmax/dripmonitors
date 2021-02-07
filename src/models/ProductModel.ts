import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Product } from '../types/Product';

const dbProvider = DatabaseProvider.getInstance();

export class ProductModel {

  public static SetProducts = async function ({ products, monitorpageId }: { products: Array<Product>, monitorpageId: string }) {
    products.forEach(async (product) => {
      product.monitorpageId = monitorpageId;
      let result = await dbProvider.Get('lsb.products', { id: product.id });
      if (result && result.Item) {
        let update = product.ToDBUpdate();
        await dbProvider.Update('lsb.products', update.key, update.expression, update.values, null, update.names);
      } else
        await dbProvider.Insert('lsb.products', product.ToDBObject());
    });
  }

}