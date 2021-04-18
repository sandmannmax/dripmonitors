import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { Role } from "../../domain/models/Role";
import { RoleDTO } from "../useCases/getMonitors/dtos/RoleDTO";

export class RoleMap {
  public static toDTO(role: Role): RoleDTO {
    return {
      discordId: role.discordId.toString(),
      name: role.name,
    };
  }

  public static toDTOBulk(roles: Role[]): RoleDTO[] {
    let roleDTOs: RoleDTO[] = [];

    for (let i = 0; i < roles.length; i++) {
      roleDTOs.push(RoleMap.toDTO(roles[i]));
    }
    
    return roleDTOs;
  }

  public static toAggregate(raw: any): Role {
    let role = Role.create({
      discordId: DiscordId.create(raw.discordId),
      name: raw.name,
    }, Uuid.create({ from: 'uuid', uuid: raw.uuid }));
    
    return role;
  }

  public static toPersistence(role: Role, monitorUuid: Uuid): any {
    const raw: any = {
      discordId: role.discordId.toString(),
      name: role.name,
      monitorUuid: monitorUuid.toString(),
    };
    
    return raw;
  }
}