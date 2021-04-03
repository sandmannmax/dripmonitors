import { AggregateRoot } from "../../core/base/AggregateRoot";
import { UniqueEntityID } from "../../core/base/UniqueEntityID";
import { Validator } from "../../core/logic/Validator";
import { Size } from "./Size";
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import { MonitorpageId } from "./MonitorpageId";

interface ProductProps {
  productId: string;
  monitorpageId: MonitorpageId;
  name: string;
  href: string;
  img: string;
  monitored: boolean;
  price?: string;
  active?: boolean;
  sizes?: Size[];
}

export class Product extends AggregateRoot<ProductProps> {

  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
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

    const isNewProduct = !!id === false;

    if (isNewProduct) {
      const productIdHash = md5(props.productId);
      const newUuid = uuidv4({ random: Buffer.from(productIdHash, 'hex') });
      id = new UniqueEntityID(newUuid);
    }

    return new Product(props, id);
  }

  get productId(): string { return this.props.productId; }
  get monitorpageId(): MonitorpageId { return this.props.monitorpageId; }
  get name(): string { return this.props.name; }
  get href(): string { return this.props.href; }
  get img(): string { return this.props.img; }
  get monitored(): boolean { return this.props.monitored; }
  get price(): string | undefined { return this.props.price; }
  get active(): boolean | undefined { return this.props.active; }
  get sizes(): Size[] | undefined { return this.props.sizes; }

  public activateMonitoring() {
    this.props.monitored = true;
  }

  public disableMonitoring() {
    this.props.monitored = true;
  }
}