import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { ServerUuid } from "../models/ServerUuid";
import { User } from "../models/User";

export interface IUserRepo {
  getUserByUuid(userUuid: Uuid): Promise<User>;
  getUserByServerUuid(serverUuid: ServerUuid): Promise<User>;
  exists(userUuid: Uuid): Promise<boolean>;
  serverExists(serverDiscordId: DiscordId): Promise<boolean>;
  save(user: User): Promise<void>;
}