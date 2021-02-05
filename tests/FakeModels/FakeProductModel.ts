import { Product } from '../../src/types/Product';

export class ProductModel {

  GetProduct = async function ({ id }: { id: string }): Promise<Product> {
    let result = await this.dbProvider.Get('lsb.products', { id });
    return result.Item as Product;
  }

  GetProducts = async function (): Promise<Array<Product>> {
    let result = await this.dbProvider.Find('lsb.products', "", {});
    return result.Items as Array<Product>;
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    let result = await this.dbProvider.Get('lsb.products', { id });
    return result.Item == null;
  }
}