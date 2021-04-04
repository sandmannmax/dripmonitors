import { logger } from '../../util/logger';
import { ChannelDTO } from './ChannelDTO';
import { WebhookDTO } from './WebhookDTO';

export interface MonitorJobContentDTO {
  urls: string[];
  proxy: string;
  isHtml: boolean;
  channels: WebhookDTO[] | ChannelDTO[];
}

export function IsMonitorJobContentDTO(object: any) {
  let hasMembers: boolean = true;

  if (!('urls' in object && object.urls instanceof Array && (object.urls.length == 0 || typeof object.urls[0] == 'string'))) {
    hasMembers = false;
  }

  if (!('proxy' in object && typeof object.proxy == 'string')) {
    hasMembers = false;
  }

  if (!('isHtml' in object && typeof object.isHtml == 'boolean')) {
    hasMembers = false;
  }

  if (!('channels' in object && object.urls instanceof Array)) {
    hasMembers = false;
  }

  return hasMembers;
}