import { AggregateRoot } from "../../core/base/AggregateRoot";
import { UniqueEntityID } from "../../core/base/UniqueEntityID";
import { Validator } from "../../core/logic/Validator";
import { Size } from "./Size";
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import { MonitorpageId } from "./MonitorpageId";
import { ProductScrapedDTO } from "../../application/dto/ProductScrapedDTO";
import { Price } from "./Price";
import { logger } from "../../util/logger";
import { NotifySubjectDTO } from "../../application/dto/NotifySubjectDTO";
import { NullOrUndefinedException } from "../../core/exceptions/NullOrUndefinedException";
import { ProductNotMonitoredException } from "../../core/exceptions/ProductNotMonitoredException";
import { NotifySizeDTO } from "../../application/dto/NotifySizeDTO";

interface ProductProps {
  productId: string;
  monitorpageId: MonitorpageId;
  name: string;
  href: string;
  img: string;
  monitored: boolean;
  price?: Price;
  active?: boolean;
  sizes?: Size[];
}

export class Product extends AggregateRoot<ProductProps> {
  private _shouldSave: boolean;
  private _shouldNotify: boolean;
  private _sizesForNotify: Size[];

  private constructor(props: ProductProps, shouldSave: boolean, id?: UniqueEntityID) {
    super(props, id);
    this._shouldSave = shouldSave;
    this._shouldNotify = false;
    this._sizesForNotify = [];
  }

  public static create(props: ProductProps, id?: UniqueEntityID): Product {
    Validator.notNullOrUndefinedBulk([
      { argument: props.productId, argumentName: 'productId' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.href, argumentName: 'href' },
      { argument: props.img, argumentName: 'img' },
      { argument: props.monitored, argumentName: 'monitored' },
      { argument: props.monitorpageId, argumentName: 'monitorpageId' }
    ]);

    const isNewProduct = id === undefined;

    if (isNewProduct) {
      id = Product.calculateUuid(props.productId);
    }

    return new Product(props, isNewProduct, id);
  }

  public static calculateUuid(productId: string): UniqueEntityID {
    const productIdHash = md5(productId);
    const newUuid = uuidv4({ random: Buffer.from(productIdHash, 'hex') });
    return new UniqueEntityID(newUuid);
  }

  get productId(): string { return this.props.productId; }
  get monitorpageId(): MonitorpageId { return this.props.monitorpageId; }
  get name(): string { return this.props.name; }
  get href(): string { return this.props.href; }
  get img(): string { return this.props.img; }
  get monitored(): boolean { return this.props.monitored; }
  get price(): Price | undefined { return this.props.price; }
  get active(): boolean | undefined { return this.props.active; }
  get sizes(): Size[] | undefined { return this.props.sizes; }
  get isSoldOut(): boolean | undefined {
    if (this.props.sizes == undefined || this.props.sizes == null) {
      return undefined;
    }
    
    if (this.props.sizes.length == 0) {
      return true;
    }

    let soldOut = true;

    for (let i = 0; i < this.props.sizes.length; i++) {
      if (this.props.sizes[i].soldOut == false) {
        soldOut = false;
        break;
      }
    }

    return soldOut;
  }
  get shouldSave(): boolean { return this._shouldSave; }
  get shouldNotify(): boolean { return this._shouldNotify; }

  private get hasATC(): boolean {
    if (this.props.sizes == undefined) {
      return false;
    }

    let hasATC = true;

    for (let i = 0; i < this.props.sizes.length; i++) {
      if (this.props.sizes[i].atc == undefined) {
        hasATC = false;
      }
    }

    return hasATC;
  }

  public activateMonitoring() {
    if (this.props.monitored == false) {
      this._shouldSave = true;
    }

    this.props.monitored = true;
  }

  public disableMonitoring() {
    if (this.props.monitored == true) {
      this._shouldSave = true;
    }

    this.props.monitored = false;
  }

  public updateBasicPropertiesFromScraped(productScraped: ProductScrapedDTO) {
    if (this.props.name != productScraped.name) {
      this.props.name = productScraped.name;
      this._shouldSave = true;
    }

    if (this.props.href != productScraped.href) {
      this.props.href = productScraped.href;
      this._shouldSave = true;
    }

    if (this.props.img != productScraped.img) {
      this.props.img = productScraped.img;
      this._shouldSave = true;
    }
  }

  public updateMonitoredPropertiesFromScraped(productScraped: ProductScrapedDTO) {
    if (this.props.monitored != true) {
      throw new ProductNotMonitoredException(`Product {${this._id}} is not monitored.`);
    }
    
    if (productScraped.active != undefined && this.props.active != productScraped.active) {
      this.props.active = productScraped.active;
      this._shouldSave = true;

      if (this.props.active == true) {
        this._shouldNotify = true;
      }
    }

    if (productScraped.price != undefined && this.props.price != productScraped.price) {
      this.props.price = Price.create({ value: productScraped.price.value, currency: productScraped.price.currency });
      this._shouldSave = true;
    }

    if (productScraped.sizes != undefined && productScraped.sizes.length > 0) {
      for (let i = 0; i < productScraped.sizes.length; i++) {
        let size = Size.create({ value: productScraped.sizes[i].value, soldOut: productScraped.sizes[i].soldOut, atc: productScraped.sizes[i].atc });
        if (this.props.sizes != undefined) {
          let sameSizeIndex = this.props.sizes.findIndex(s => s.equals(size));

          if (sameSizeIndex != -1) {
            if (this.props.sizes[sameSizeIndex].soldOut != size.soldOut) {
              this.props.sizes[sameSizeIndex] = size;
              this._shouldSave = true;

              if (size.soldOut == false) {
                this._shouldNotify = true;
                this._sizesForNotify.push(size);
              }
            }
          } else {
            this._shouldSave = true;
            this.props.sizes.push(size);

            if (size.soldOut == false) {
              this._shouldNotify = true;
              this._sizesForNotify.push(size);
            }
          }
        } else {
          this._shouldSave = true;
          this.props.sizes = [];
          this.props.sizes.push(size);

          if (size.soldOut == false) {
            this._shouldNotify = true;
            this._sizesForNotify.push(size);
          }
        }
      }        
    }

    if (this.props.sizes != undefined && this.props.sizes.length > 0) {
      for (let i = 0; i < this.props.sizes.length; i++) {
        const value = this.props.sizes[i].value;
        const atc = this.props.sizes[i].atc;

        if (productScraped.sizes != undefined && productScraped.sizes.length > 0) {
          let sameSizeIndex = productScraped.sizes.findIndex(s => s.value == value);

          if (sameSizeIndex == -1) {
            this.props.sizes[i] = Size.create({ value, soldOut: true, atc });
          }
        } else {
          this.props.sizes[i] = Size.create({ value, soldOut: true, atc });          
        }          
      }
    }

    if (this._shouldNotify && (this.props.active == false || this.isSoldOut == true)) {
      this._shouldNotify = false;
    }
  }

  public createNotifySubject(): NotifySubjectDTO {
    if (this.props.price == undefined) {
      throw new NullOrUndefinedException('price is undefined for product.');
    }

    if (this.props.sizes == undefined) {
      throw new NullOrUndefinedException('sizes are undefined for product.');
    }

    let sizes: NotifySizeDTO[] = [];

    if (this._sizesForNotify.length > 0) {
      for (let i = 0; i < this._sizesForNotify.length; i++) {
        sizes.push({ value: this._sizesForNotify[i].value, atc: this._sizesForNotify[i].atc });
      }
    } else {
      for (let i = 0; i < this.props.sizes.length; i++) {
        if (this.props.sizes[i].soldOut == false) {
          sizes.push({ value: this.props.sizes[i].value, atc: this.props.sizes[i].atc });
        }
      }
    }

    let notifySubject: NotifySubjectDTO = {
      name: this.props.name,
      href: this.props.href,
      img: this.props.img,
      price: this.props.price.toString(),
      sizes,
      hasATC: this.hasATC,
    };
    this._shouldNotify = false;
    this._sizesForNotify = [];
    return notifySubject;
  }
}