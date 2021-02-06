import { DatabaseProvider } from '../provider/DatabaseProvider';
import { Product } from '../types/Product';

const dbProvider = DatabaseProvider.getInstance();

export class ProductModel {

  public static SetProducts = async function ({ products }: { products: Array<Product> }) {
    products.forEach(product => {
      let result = dbProvider.Get('lsb.products', { id: product.id });
    });
  }

}