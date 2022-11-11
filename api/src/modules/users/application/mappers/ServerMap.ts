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
      serverName: raw.server_name,
      serverDiscordId: DiscordId.create(raw.server_discord_id),
      isMonitorSubscriptionActive: raw.is_monitor_subscription_active,
    }, Uuid.create({ from: 'uuid', uuid: raw.server_uuid }));
    
    return server;
  }

  public static toPersistence(server: Server, userUuid: Uuid): any {
    const raw: any = {
      server_uuid: server.uuid.toString(),
      server_name: server.serverName,
      server_discord_id: server.serverDiscordId.toString(),
      is_monitor_subscription_active: server.isMonitorSubscriptionActive,
      user_uuid: userUuid.toString(),
    };
    
    return raw;
  }
}