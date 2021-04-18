import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { User } from "../../domain/models/User";
import { ServerMap } from "./ServerMap";

export class UserMap {
  public static toAggregate(raw: any): User {
    let server = User.create({
      userDiscordId: DiscordId.create(raw.userDiscordId),
      servers: raw.Servers.map((s: any) => ServerMap.toAggregate(s)),
    }, Uuid.create({ from: 'uuid', uuid: raw.uuid }));
    
    return server;
  }

  public static toPersistence(user: User): any {
    const raw: any = {
      userDiscordId: user.userDiscordId.toString(),
    };
    
    return raw;
  }
}