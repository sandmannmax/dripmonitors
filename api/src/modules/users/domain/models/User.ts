import { AggregateRoot } from "../../../../core/base/AggregateRoot";
import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { ServerNotFoundException } from "../../../../core/exceptions/ServerNotFoundException";
import { Validator } from "../../../../core/logic/Validator";
import { logger } from "../../../../utils/logger";
import { Server } from "./Server";
import { ServerUuid } from "./ServerUuid";

interface UserProps {
  userDiscordId: DiscordId;
  servers: Server[];
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps, uuid: Uuid) {
    super(props, uuid);
  }

  public static create(props: UserProps, uuid?: Uuid): User {
    Validator.notNullOrUndefinedBulk([
      { argument: props.userDiscordId, argumentName: 'userDiscordId' },
      { argument: props.servers, argumentName: 'servers' },
    ]);

    if (uuid == undefined || uuid == null) {
      uuid = Uuid.create({ from: 'base', base: props.userDiscordId.toString() });
    }

    const user = new User(props, uuid);
    return user;
  }

  public get userDiscordId(): DiscordId { return this.props.userDiscordId; }
  public get servers(): Server[] { return this.props.servers; }

  public checkWebhookUsability(serverUuid: Uuid, serverDiscordId: DiscordId): void {
    let serverIndex = this.props.servers.findIndex(s => s.uuid.equals(serverUuid));

    if (serverIndex === -1) {
      throw new ServerNotFoundException('Discord Webhook is not from your Server');
    }

    if (!this.props.servers[serverIndex].serverDiscordId.equals(serverDiscordId)) {
      throw new ServerNotFoundException('Discord Webhook is not from your Server');
    }
  }

  public checkServerActive(serverUuid: ServerUuid): boolean {
    let serverIndex = this.props.servers.findIndex(s => s.uuid.equals(serverUuid.uuid));
    
    if (serverIndex === -1) {
      throw new ServerNotFoundException();
    }

    return this.props.servers[serverIndex].isMonitorSubscriptionActive;
  }
}