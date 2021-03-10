import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Product } from '../types/Product';

export class ProductModel {
  private dbProvider: DatabaseProvider;

  constructor() {
    this.dbProvider = DatabaseProvider.getInstance();
  }

  async GetProduct({ id }: { id: string }): Promise<Product> {
    let result = await this.dbProvider.Get('lsb.products', { id });
    if (result.Item != null)
      return Product.FromDBObject({ id: result.Item.id, name: result.Item.name, monitorpageId: result.Item.monitorpageId, href: result.Item.href, img: result.Item.img, price: result.Item.price, sizes: result.Item.sizes, sizesSoldOut: result.Item.sizesSoldOut, soldOut: result.Item.soldOut, active: result.Item.active, hasSizes: result.Item.hasSizes });
    else
      return null;
  }

  async GetProducts(): Promise<Array<Product>> {
    let result = await this.dbProvider.GetAll('lsb.products');
    if (result.Items != null) {
      let products = new Array<Product>();
      for (let i = 0; i < result.Items.length; i++) {
        products.push(Product.FromDBObject({ id: result.Items[i].id, name: result.Items[i].name, monitorpageId: result.Items[i].monitorpageId, href: result.Items[i].href, img: result.Items[i].img, price: result.Items[i].price, sizes: result.Items[i].sizes, sizesSoldOut: result.Items[i].sizesSoldOut, soldOut: result.Items[i].soldOut, active: result.Items[i].active, hasSizes: result.Items[i].hasSizes }))
      }
      return products;
    } else
      return [];
  }

  async AddProduct({ product, monitorpageId }: { product: Product, monitorpageId: string }) {
    product.monitorpageId = monitorpageId;
    await this.dbProvider.Insert('lsb.products', product.ToDBObject());
  }

  async UpdateProduct({ product, monitorpageId }: { product: Product, monitorpageId: string }) {
    product.monitorpageId = monitorpageId;
    let update = product.ToDBUpdate();
    await this.dbProvider.Update('lsb.products', update.key, update.expression, update.values, null, update.names);
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.products', { id });
    return result.Item == null;
  }
}