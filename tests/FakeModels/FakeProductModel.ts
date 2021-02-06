import { ProductModel } from '../../src/models/ProductModel';
import { Product } from '../../src/types/Product';

export class FakeProductModel extends ProductModel {

  private static productArray: Array<Product> = [{ id: '4321', name: 'nike', monitorpageId: '4321', href: 'https://nike.com', img: 'https://nike.com', price: '69.420,00 EUR', sizes: [], sizesSoldOut: [], soldOut: true, active: true }]

  GetProduct = async function ({ id }: { id: string }): Promise<Product> {
    return FakeProductModel.productArray.find(item => item.id === id);
  }

  GetProducts = async function (): Promise<Array<Product>> {
    return FakeProductModel.productArray;
  }

  IdUnused = async function ({ id }: { id: string }): Promise<boolean> {
    return FakeProductModel.productArray.findIndex(item => item.id === id) === -1;
  }
}