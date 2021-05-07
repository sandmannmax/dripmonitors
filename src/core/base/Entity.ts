import { Uuid } from "./Uuid";

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};

export abstract class Entity<T> {
  protected readonly _uuid: Uuid;
  protected readonly props: T;

  constructor (props: T, uuid?: Uuid) {
    this._uuid = uuid ? uuid : Uuid.create({ from: 'new' });
    this.props = props;
  }

  public equals (object?: Entity<T>) : boolean {

    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }

    return this._uuid.equals(object._uuid);
  }
}