import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { User } from "../../domain/models/User";
import { ServerMap } from "./ServerMap";

export class UserMap {
  public static toAggregate(raw: any): User {
    let server = User.create({
      userDiscordId: DiscordId.create(raw.user_discord_id),
      servers: raw.Servers.map((s: any) => ServerMap.toAggregate(s)),
    }, Uuid.create({ from: 'uuid', uuid: raw.user_uuid }));
    
    return server;
  }

  public static toPersistence(user: User): any {
    const raw: any = {
      user_uuid: user.uuid.toString(),
      user_discord_id: user.userDiscordId.toString(),
    };
    
    return raw;
  }
}