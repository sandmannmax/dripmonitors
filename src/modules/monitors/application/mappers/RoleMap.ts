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
      discordId: DiscordId.create(raw.discord_id),
      name: raw.name,
    }, Uuid.create({ from: 'uuid', uuid: raw.role_uuid }));
    
    return role;
  }

  public static toPersistence(role: Role, monitorUuid: Uuid): any {
    const raw: any = {
      role_uuid: role.uuid.toString(),
      discord_id: role.discordId.toString(),
      name: role.name,
      monitor_uuid: monitorUuid.toString(),
    };
    
    return raw;
  }
}