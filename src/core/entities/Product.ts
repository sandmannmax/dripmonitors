import { AggregateRoot } from "../base/AggregateRoot";
import { UniqueEntityID } from "../base/UniqueEntityID";
import { Guard } from "../logic/Guard";
import { Result } from "../logic/Result";
import { Size } from "./Size";
import { v4 as uuidv4 } from 'uuid';
import md5 from 'md5';
import { Monitorpage } from "./Monitorpage";

interface ProductProps {
  productId: string;
  name: string;
  href: string;
  img: string;
  monitored: boolean;
  monitorpage: Monitorpage;
  price?: string;
  soldOut?: boolean;
  active?: boolean;
  sizes?: Size[];
}

export class Product extends AggregateRoot<ProductProps> {

  private constructor(props: ProductProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: ProductProps, id?: UniqueEntityID): Result<Product> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      { argument: props.productId, argumentName: 'productId' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.href, argumentName: 'href' },
      { argument: props.img, argumentName: 'img' },
      { argument: props.monitored, argumentName: 'monitored' },
      { argument: props.monitorpage, argumentName: 'monitorpage' }
    ]);

    if (!guardResult.succeeded) {
      return Result.fail<Product>(guardResult.message);
    }

    const isNewProduct = !!id === false;

    if (isNewProduct) {
      const productIdHash = md5(props.productId);
      const newUuid = uuidv4({ random: Buffer.from(productIdHash, 'hex') });
      id = new UniqueEntityID(newUuid);
    }

    const product = new Product(props, id)

    return Result.ok<Product>(product);
  }

  get productId(): string { return this.props.productId; }
  get name(): string { return this.props.name; }
  get href(): string { return this.props.href; }
  get img(): string { return this.props.img; }
  get monitored(): boolean { return this.props.monitored; }
  set monitored(value: boolean) { this.props.monitored = value; }
  get monitorpage(): Monitorpage { return this.props.monitorpage; }
  get price(): string | undefined { return this.props.price; }
  get soldOut(): boolean | undefined { return this.props.soldOut; }
  get active(): boolean | undefined { return this.props.active; }
  get sizes(): Size[] | undefined { return this.props.sizes; }
}