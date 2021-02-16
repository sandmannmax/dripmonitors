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

  public ToDBObject = () => {
    return { id: this.id, name: this.name, monitorpageId: this.monitorpageId, href: this.href, img: this.img, price: this.price, sizes: this.sizes.join('$'), sizesSoldOut: this.sizesSoldOut.join('$'), soldOut: this.soldOut, active: this.active };
  }

  public ToDBUpdate = () => {
    return { 
      key: { id: this.id }, 
      expression: 'set #n = :name, monitorpageId = :monitorpageId, href = :href, img = :img, price = :price, sizes = :sizes, sizesSoldOut = :sizesSoldOut, soldOut = :soldOut, active = :active',
      values: { ':name': this.name, ':monitorpageId': this.monitorpageId, ':href': this.href, ':img': this.img, ':price': this.price, ':sizes': this.sizes.join('$'), ':sizesSoldOut': this.sizesSoldOut.join('$'), ':soldOut': this.soldOut, ':active': this.active }, 
      names: { '#n': 'name'}
    };
  }

  public static FromDBObject = ({ id, name, monitorpageId, href, img, price, sizes, sizesSoldOut, soldOut, active }) => {
    let product = new Product();
    product.id = id;
    product.name = name;
    product.monitorpageId = monitorpageId;
    product.href = href;
    product.img = img;
    product.price = price;
    product.sizes = sizes.split('$');
    let sizesSoldOutStrings = sizesSoldOut.split('$'); 
    product.sizesSoldOut = [];
    sizesSoldOutStrings.forEach(s => product.sizesSoldOut.push(s === "true"));
    product.soldOut = soldOut;
    product.active = active;
    return product;
  }
}