import { Container } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Product } from '../types/Product';

const dbProvider = Container.get(DatabaseProvider);

export namespace ProductModel {
  export async function GetProduct({ id }: { id: string }): Promise<Product> {
    let result = await dbProvider.Get('lsb.products', { id });
    return result.Item as Product;
  }

  export async function GetProducts(): Promise<Array<Product>> {
    let result = await dbProvider.Find('lsb.products', "", {});
    return result.Items as Array<Product>;
  }

  export async function IdUnused({ id }: { id: string }): Promise<boolean> {
    let result = await dbProvider.Get('lsb.products', { id });
    return result.Item == null;
  }
}