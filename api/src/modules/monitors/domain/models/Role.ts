import { DiscordId } from "../../../../core/base/DiscordId";
import { Entity } from "../../../../core/base/Entity";
import { Uuid } from "../../../../core/base/Uuid";
import { Validator } from "../../../../core/logic/Validator";

interface RoleProps {
  discordId: DiscordId;
  name: string;
}

export class Role extends Entity<RoleProps> {
  private constructor(props: RoleProps, uuid?: Uuid) {
    super(props, uuid);
  }

  public static create(props: RoleProps, uuid?: Uuid): Role {
    Validator.notNullOrUndefinedBulk([
      { argument: props.discordId, argumentName: 'discordId' },
      { argument: props.name, argumentName: 'name' },
    ]);

    return new Role(props, uuid);
  }

  get uuid(): Uuid { return this._uuid; }
  get discordId(): DiscordId { return this.props.discordId; }
  get name(): string { return this.props.name; }
}