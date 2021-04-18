export interface AddRoleCommandDTO {
  userDiscordId: string;
  serverUuid: string;
  monitorUuid: string;
  roleDiscordId: string;
  roleName: string;
}