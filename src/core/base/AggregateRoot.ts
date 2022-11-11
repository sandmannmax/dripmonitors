import { Entity } from "./Entity";
import { Uuid } from "./Uuid";

export abstract class AggregateRoot<T> extends Entity<T> {
  get uuid (): Uuid {
    return this._uuid;
  }  
}