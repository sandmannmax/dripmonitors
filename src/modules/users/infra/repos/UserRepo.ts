import { Sequelize } from 'sequelize';
import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { logger } from '../../../../utils/logger';
import { UserMap } from '../../application/mappers/UserMap';
import { ServerUuid } from '../../domain/models/ServerUuid';
import { User } from "../../domain/models/User";
import { IUserRepo } from "../../domain/repos/IUserRepo";
import { IServerRepo } from './ServerRepo';

export class UserRepo implements IUserRepo {
  private sequelize: Sequelize;
  private models: any;
  private serverRepo: IServerRepo;

  constructor (
    sequelize: Sequelize,
    models: any,
    serverRepo: IServerRepo,
  ) {
    this.sequelize = sequelize;
    this.models = models;
    this.serverRepo = serverRepo;
  }

  private createBaseQuery (): any {
    const { models } = this;
    return {
      where: {},
      include: [
        { 
          model: models.Server, as: 'Servers'
        }
      ]
    }
  }

  public async getUserByUuid(userUuid: Uuid): Promise<User> {
    const UserModel = this.models.User;
    const query = this.createBaseQuery();
    query.where.user_uuid = userUuid.toString();
    const userInstance = await UserModel.findOne(query);
    return UserMap.toAggregate(userInstance);
  }

  public async getUserByServerUuid(serverUuid: ServerUuid): Promise<User> {
    const UserModel = this.models.User;
    const query = this.createBaseQuery();
    query.where.Servers.server_uuid = serverUuid.uuid.toString();
    const userInstance = await UserModel.findOne(query);
    return UserMap.toAggregate(userInstance);
  }

  public async exists(userUuid: Uuid): Promise<boolean> {
    const UserModel = this.models.User;
    const query = this.createBaseQuery();
    query.where.user_uuid = userUuid.toString();
    const userInstance = await UserModel.findOne(query);
    return userInstance !== null;
  }
  
  public async serverExists(serverDiscordId: DiscordId): Promise<boolean> {
    return await this.serverRepo.exists(serverDiscordId);
  }
  
  public async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const userRaw = UserMap.toPersistence(user);

    const query = this.createBaseQuery();
    query.where.user_uuid = user.uuid.toString();
    const userInstance = await UserModel.findOne(query);

    const t = await this.sequelize.transaction();

    logger.info(userRaw);

    try {
      if (userInstance === null) {
        await UserModel.create(userRaw, { transaction: t });
      } else {
        await userInstance.update(userRaw, { transaction: t });
      }

      await Promise.all(user.servers.map(r => this.serverRepo.save(r, user.uuid, t)));
      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}