import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Product } from '../types/Product';

const dbProvider = DatabaseProvider.getInstance();

export class ProductModel {

  public static GetProduct = async function ({ id }: { id: string }) {
    let result = await dbProvider.Get('lsb.products', { id });
    if (result.Item != null)
      return Product.FromDBObject({ id: result.Item.id, name: result.Item.name, monitorpageId: result.Item.monitorpageId, href: result.Item.href, img: result.Item.img, price: result.Item.price, sizes: result.Item.sizes, sizesSoldOut: result.Item.sizesSoldOut, soldOut: result.Item.soldOut, active: result.Item.active, hasSizes: result.Item.hasSizes });
    else
      return null;
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