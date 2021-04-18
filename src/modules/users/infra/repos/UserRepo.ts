import { Sequelize } from 'sequelize';
import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { UserMap } from '../../application/mappers/UserMap';
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
    query.where.uuid = userUuid.toString();
    const userInstance = await UserModel.findOne(query);
    return UserMap.toAggregate(userInstance);
  }

  public async exists(userUuid: Uuid): Promise<boolean> {
    const UserModel = this.models.User;
    const query = this.createBaseQuery();
    query.where.uuid = userUuid.toString();
    const userInstance = await UserModel.findOne(query);
    return userInstance !== null;
  }
  
  public async serverExists(serverDiscordId: DiscordId): Promise<boolean> {
    return await this.serverRepo.exists(serverDiscordId);
  }
  
  public async save(user: User): Promise<void> {
    const UserModel = this.models.User;
    const userTaw = UserMap.toPersistence(user);

    const query = this.createBaseQuery();
    query['where'].uuid = user.uuid.toString();
    const userInstance = await UserModel.findOne(query);

    const t = await this.sequelize.transaction();

    try {
      await Promise.all(user.servers.map(r => this.serverRepo.save(r, user.uuid, t)));

      if (userInstance === null) {
        await UserModel.create(userTaw, { transaction: t });
      } else {
        await userInstance.update(userTaw, { transaction: t });
      }

      await t.commit();
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}