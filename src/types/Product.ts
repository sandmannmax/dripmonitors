export class Product {
  public id: string;
  public name: string;
  public monitorpageId: string;
  public href: string;
  public img: string;
  public price: string;
  public sizes: Array<string>;
  public sizesSoldOut: Array<boolean>;
  public soldOut: boolean;
  public active: boolean;
}