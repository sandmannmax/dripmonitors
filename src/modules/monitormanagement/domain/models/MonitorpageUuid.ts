import { Uuid } from "../../../../core/base/Uuid";
import { Entity } from "../../../../core/base/Entity";

export class MonitorpageUuid extends Entity<any> {
  private constructor (uuid?: Uuid) {
    super(null, uuid)
  }

  public static create (uuid?: Uuid): MonitorpageUuid {
    return new MonitorpageUuid(uuid);
  }

  get uuid(): Uuid { return this._uuid; }
}