import { DiscordId } from '../../../../core/base/DiscordId';
import { Uuid } from '../../../../core/base/Uuid';
import { ServerDuplicateException } from '../../../../core/exceptions/ServerDuplicateException';
import { UserDuplicateException } from '../../../../core/exceptions/UserDuplicateException';
import { Server } from '../../domain/models/Server';
import { ServerUuid } from '../../domain/models/ServerUuid';
import { User } from '../../domain/models/User';
import { IUserRepo } from '../../domain/repos/IUserRepo';
import { CheckUserDTO } from '../dto/CheckUserDTO';
import { ServerMap } from '../mappers/ServerMap';

export interface IUserService {
  checkUser(userDiscordId: string): Promise<CheckUserDTO>;
  createUser({ userDiscordId, serverName, serverDiscordId }: { userDiscordId: string, serverName: string, serverDiscordId: string }): Promise<void>;
  checkWebhookUsability({ userUuid, serverUuid, webhookServerDiscordId }: { userUuid: string, serverUuid: string, webhookServerDiscordId: string }): Promise<void>;
}

export class UserService implements IUserService {
  private userRepo: IUserRepo;

  constructor(
    userRepo: IUserRepo,
  ) {
    this.userRepo = userRepo;
  }

  public async checkUser(userDiscordId: string): Promise<CheckUserDTO> {
    const userDiscordIdObject = DiscordId.create(userDiscordId);
    const userUuid = Uuid.create({ base: userDiscordIdObject.toString() });
    const userExists = await this.userRepo.exists(userUuid);

    if (userExists != true) {
      return { isUser: false };
    }

    const user = await this.userRepo.getUserByUuid(userUuid);
    return {
      isUser: true,
      servers: user.servers.map(s => ServerMap.toDTO(s)),
    }
  }

  public async createUser({ userDiscordId, serverName, serverDiscordId }: { userDiscordId: string, serverName: string, serverDiscordId: string }): Promise<void> {
    const userDiscordIdObject = DiscordId.create(userDiscordId);
    const userUuid = Uuid.create({ base: userDiscordIdObject.toString() });
    const serverDiscordIdObject = DiscordId.create(serverDiscordId);

    const userExists = await this.userRepo.exists(userUuid);
    if (userExists) {
      throw new UserDuplicateException(`The User with id {${userDiscordId}} already exists.`);
    }

    const serverExists = await this.userRepo.serverExists(serverDiscordIdObject);
    if (serverExists) {
      throw new ServerDuplicateException(`The Discord Server with id {${serverDiscordId}} already exists.`);
    }

    const server = Server.create({ serverName, serverDiscordId: serverDiscordIdObject, isMonitorSubscriptionActive: false });
    const user = User.create({ userDiscordId: userDiscordIdObject, servers: [server] });
    await this.userRepo.save(user);
  }

  public async checkWebhookUsability({ userUuid, serverUuid, webhookServerDiscordId }: { userUuid: string, serverUuid: string, webhookServerDiscordId: string }): Promise<void> {
    const userUuidObject = Uuid.create({ uuid: userUuid });
    const serverUuidObject = Uuid.create({ uuid: serverUuid });
    const webhookServerDiscordIdObject = DiscordId.create(webhookServerDiscordId);

    const user = await this.userRepo.getUserByUuid(userUuidObject);
    user.checkWebhookUsability(serverUuidObject, webhookServerDiscordIdObject);
  }
}