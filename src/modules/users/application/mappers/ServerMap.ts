import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { Server } from "../../domain/models/Server";
import { ServerDTO } from "../dto/ServerDTO";

export class ServerMap {
  public static toDTO(server: Server): ServerDTO {
    return {
      serverUuid: server.uuid.toString(),
      serverName: server.serverName,
      isMonitorSubscriptionActive: server.isMonitorSubscriptionActive,
    };
  }

  public static toAggregate(raw: any): Server {
    let server = Server.create({
      serverName: raw.serverName,
      serverDiscordId: DiscordId.create(raw.serverDiscordId),
      isMonitorSubscriptionActive: raw.isMonitorSubscriptionActive,
    }, Uuid.create({ from: 'uuid', uuid: raw.uuid }));
    
    return server;
  }

  public static toPersistence(server: Server, userUuid: Uuid): any {
    const raw: any = {
      serverName: server.serverName,
      serverDiscordId: server.serverDiscordId.toString(),
      isMonitorSubscriptionActive: server.isMonitorSubscriptionActive,
      userUuid: userUuid.toString(),
    };
    
    return raw;
  }
}