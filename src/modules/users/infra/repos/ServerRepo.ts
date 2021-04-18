import { Transaction } from "sequelize";
import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { ServerMap } from "../../application/mappers/ServerMap";
import { Server } from "../../domain/models/Server";

export interface IServerRepo {
  exists(serverDiscordId: DiscordId): Promise<boolean>;  
  save(server: Server, userUuid: Uuid, t: Transaction): Promise<void>;  
}

export class ServerRepo implements IServerRepo {
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

  public async exists(serverDiscordId: DiscordId): Promise<boolean> {
    const ServerModel = this.models.Server;
    const query = this.createBaseQuery();
    query.where.serverDiscordId = serverDiscordId.toString();
    const serverInstance = await ServerModel.findOne(query);
    return serverInstance !== null;
  }
  
  public async save(server: Server, userUuid: Uuid, t: Transaction): Promise<void> {
    const ServerModel = this.models.Role;
    const serverRaw = ServerMap.toPersistence(server, userUuid);

    const query = this.createBaseQuery();
    query['where'].uuid = server.uuid;
    const serverInstance = await ServerModel.findOne(query);

    if (serverInstance === null) {
      await ServerModel.create(serverRaw, { transaction: t });
    } else {
      await serverInstance.update(serverRaw, { transaction: t });
    }
  }  
}