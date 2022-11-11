import { AggregateRoot } from "../../../../core/base/AggregateRoot";
import { DiscordId } from "../../../../core/base/DiscordId";
import { Uuid } from "../../../../core/base/Uuid";
import { RoleAlreadyExistingException } from "../exceptions/RoleAlreadyExistingException";
import { RoleNotExistingException } from "../exceptions/RoleNotExistingException";
import { Validator } from "../../../../core/logic/Validator";
import { MonitorsourceUuid } from "../../../monitormanagement/domain/models/MonitorsourceUuid";
import { ServerUuid } from "../../../users/domain/models/ServerUuid";
import { ImageUrl } from "./ImageUrl";
import { NotificationTarget } from "./NotificationTarget";
import { Role } from "./Role";

interface MonitorProps {
  serverUuid: ServerUuid;
  name: string;
  image: ImageUrl;  
  running: boolean;
  notificationTarget: NotificationTarget;
  roles: Role[];
  monitorsource: MonitorsourceUuid;
}

export class Monitor extends AggregateRoot<MonitorProps> {
  private constructor(props: MonitorProps, uuid?: Uuid) {
    super(props, uuid);
  }

  public static create(props: MonitorProps, uuid?: Uuid): Monitor {
    Validator.notNullOrUndefinedBulk([
      { argument: props.serverUuid, argumentName: 'serverUuid' },
      { argument: props.notificationTarget, argumentName: 'notificationTarget' },
      { argument: props.name, argumentName: 'name' },
      { argument: props.image, argumentName: 'image' },
      { argument: props.running, argumentName: 'running' },
      { argument: props.roles, argumentName: 'roles' },
      { argument: props.monitorsource, argumentName: 'monitorsource' },
    ]);

    const monitor = new Monitor(props, uuid);

    return monitor;
  }

  public get serverUuid(): ServerUuid { return this.props.serverUuid; }
  public get name(): string { return this.props.name; }
  public get image(): ImageUrl { return this.props.image; }
  public get running(): boolean { return this.props.running; }
  public get notificationTarget(): NotificationTarget { return this.props.notificationTarget; }
  public get roles(): Role[] { return this.props.roles; }
  public get monitorsource(): MonitorsourceUuid { return this.props.monitorsource; }

  public updateName(name: string) {
    this.props.name = name;
  }

  public updateImage(image: ImageUrl) {
    this.props.image = image;
  }

  public updateNotificationTarget(notificationTarget: NotificationTarget) {
    this.props.notificationTarget = notificationTarget;
  }

  public addRole(role: Role) {
    const roleIndex = this.props.roles.findIndex(r => r.discordId.equals(role.discordId));
    if (roleIndex !== -1) {
      throw new RoleAlreadyExistingException(`Role with roleDiscordId {${role.discordId.toString()}} is already existing.`);
    }

    this.props.roles.push(role);
  }

  public removeRole(roleUuid: Uuid) {
    const roleIndex = this.props.roles.findIndex(r => r.uuid.equals(roleUuid));
    if (roleIndex === -1) {
      throw new RoleNotExistingException(`Role with uuid {${roleUuid.toString()}} is not existing.`);
    }

    this.props.roles.splice(roleIndex, 1);
  }

  public startMonitor() {
    this.props.running = true;
  }

  public stopMonitor() {
    this.props.running = false;
  }

  public canNotify() {
    return this.props.running === true && this.props.notificationTarget.isInvalid === false;
  }  
}