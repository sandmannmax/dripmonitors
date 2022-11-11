import { Uuid } from "../../../../core/base/Uuid";
import { Entity } from "../../../../core/base/Entity";
import { Validator } from "../../../../core/logic/Validator";

export class ServerUuid extends Entity<any> {
  private constructor (uuid: Uuid) {
    super(null, uuid)
  }

  public static create (uuid: Uuid): ServerUuid {
    Validator.notNullOrUndefined(uuid, 'serverUuid');
    
    return new ServerUuid(uuid);
  }

  get uuid(): Uuid { return this._uuid; }
}