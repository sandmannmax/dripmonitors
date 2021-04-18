import { Transaction } from "sequelize";
import { Uuid } from "../../../../core/base/Uuid";
import { RoleMap } from "../../application/mappers/RoleMap";
import { Role } from "../../domain/models/Role";

export interface IRoleRepo {
  save(role: Role, monitorUuid: Uuid, t: Transaction): Promise<void>;  
}

export class RoleRepo implements IRoleRepo {
  private models: any;

  constructor (
    models: any,
  ) {
    this.models = models;
  }

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }
  
  public async save(role: Role, monitorUuid: Uuid, t: Transaction): Promise<void> {
    const RoleModel = this.models.Role;
    const roleRaw = RoleMap.toPersistence(role, monitorUuid);

    const query = this.createBaseQuery();
    query.where.role_uuid = role.uuid;
    const roleInstance = await RoleModel.findOne(query);

    if (roleInstance === null) {
      await RoleModel.create(roleRaw, { transaction: t });
    } else {
      await roleInstance.update(roleRaw, { transaction: t });
    }
  }  
}