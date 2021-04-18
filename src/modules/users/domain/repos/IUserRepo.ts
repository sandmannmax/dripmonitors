import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { User } from "../models/User";

export interface IUserRepo {
  getUserByUuid(userUuid: Uuid): Promise<User>;
  exists(userUuid: Uuid): Promise<boolean>;
  serverExists(serverDiscordId: DiscordId): Promise<boolean>;
  save(user: User): Promise<void>;
}