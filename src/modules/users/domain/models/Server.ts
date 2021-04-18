import { DiscordId } from "../../../../core/base/DiscordId";
import { Entity } from "../../../../core/base/Entity";
import { Uuid } from "../../../../core/base/Uuid";
import { Validator } from "../../../../core/logic/Validator";

interface ServerProps {
  serverName: string;
  serverDiscordId: DiscordId;
  isMonitorSubscriptionActive: boolean;
}

export class Server extends Entity<ServerProps> {
  private constructor(props: ServerProps, uuid?: Uuid) {
    super(props, uuid);
  }

  public static create(props: ServerProps, uuid?: Uuid): Server {
    Validator.notNullOrUndefinedBulk([
      { argument: props.serverDiscordId, argumentName: 'serverDiscordId' },
      { argument: props.serverName, argumentName: 'serverName' },
      { argument: props.isMonitorSubscriptionActive, argumentName: 'isMonitorSubscriptionActive' },
    ]);

    return new Server(props, uuid);
  }

  get uuid(): Uuid { return this._uuid; }
  get serverDiscordId(): DiscordId { return this.props.serverDiscordId; }
  get serverName(): string { return this.props.serverName; }
  get isMonitorSubscriptionActive(): boolean { return this.props.isMonitorSubscriptionActive; }
}