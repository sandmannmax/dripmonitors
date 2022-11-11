import { Role } from "../models/Role";

export class Role_O {
  public id!: string;
  public name!: string;
  public roleId!: string;
}

export function GetRole_O(role: Role): Role_O {
  let role_O: Role_O = new Role_O();
  role_O.id = role.id;
  role_O.name = role.name;
  role_O.roleId = role.roleId;
  return role_O;
}

export function GetRoles_O(roles: Role[]): Role_O[] {
  let roles_O = new Array<Role_O>();
  for (let i = 0; i < roles.length; i++) {
    roles_O.push(GetRole_O(roles[i]));
  }
  return roles_O;
}