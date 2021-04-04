import { NotificationTargetDTO } from "./NotificationTargetDTO";

export interface ChannelDTO extends NotificationTargetDTO {
  channelId: string;
  guildId: string;
}

export function IsChannelDTO(object: any) {
  return 'channelId' in object && typeof object.channelId == 'string' && 'guildId' in object && typeof object.guildId == 'string';
}