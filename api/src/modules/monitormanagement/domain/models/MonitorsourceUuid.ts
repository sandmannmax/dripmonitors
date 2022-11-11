import { Uuid } from "../../../../core/base/Uuid";
import { Entity } from "../../../../core/base/Entity";

export class MonitorsourceUuid extends Entity<any> {
  private constructor (uuid?: Uuid) {
    super(null, uuid)
  }

  public static create (uuid?: Uuid): MonitorsourceUuid {
    return new MonitorsourceUuid(uuid);
  }

  get uuid(): Uuid { return this._uuid; }
}