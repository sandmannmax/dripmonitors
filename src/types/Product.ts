export class Product {
  public _id: string;
  public name: string;
  public href: string;
  public img: string;
  public price: string;
  public sizes: Array<string>;
  public sizesSoldOut: Array<boolean>;
  public soldOut: boolean;
  public active: boolean;

  public toValues(): [string, string][] {
    let values: [string, string][] = [];
    values.push([ 'name', this.getString(this.name) ]);
    values.push([ 'href', this.getString(this.href) ]);
    values.push([ 'img', this.getString(this.img) ]);
    values.push([ 'price', this.getString(this.price) ]);
    values.push([ 'soldOut', this.getString(this.soldOut) ]);
    values.push([ 'active', this.getString(this.active) ]);
    let sizes = '';
    let sizesSoldOut = ''
    for (let i = 0; i < this.sizes.length; i++) {
      sizes += this.sizes[i];
      sizesSoldOut += this.sizesSoldOut[i].toString();
      if (i != this.sizes.length - 1) {
        sizes += '$';
        sizesSoldOut += '$';
      }
    }
    values.push([ 'sizes', sizes ])
    values.push([ 'sizesSoldOut', sizesSoldOut ])
    return values;
  }

  public fromValues(values: Record<string, string>)  {
    this.name = values.name;
    this.href = values.href;
    this.img = values.img;
    this.price = values.price;
    this.soldOut = values.soldOut == 'true';
    this.active = values.active == 'true';
    this.sizes = values.sizes.split('$');
    this.sizesSoldOut = [];
    let sizesSoldOut = values.sizesSoldOut.split('$');
    for (let i = 0; i < sizesSoldOut.length; i++) {
      this.sizesSoldOut.push(sizesSoldOut[i] == 'true')
    }
  }

  private getString(value): string {
    return value != undefined ? value.toString() : '';
  }
}