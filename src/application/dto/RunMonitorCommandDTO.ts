import { IsWebhookDTO, WebhookDTO } from './WebhookDTO';

export interface RunMonitorCommandDTO {
  urls: string[];
  proxy: string;
  targets: WebhookDTO[];
}

export function IsRunMonitorCommandDTO(object: any) {
  let hasMembers: boolean = true;

  if (!('urls' in object && object.urls instanceof Array && (object.urls.length === 0 || typeof object.urls[0] == 'string'))) {
    hasMembers = false;
  }

  if (!('proxy' in object && typeof object.proxy === 'string')) {
    hasMembers = false;
  }

  if (!('targets' in object && object.targets instanceof Array && (object.targets.length === 0 || IsWebhookDTO(object.targets[0])))) {
    hasMembers = false;
  }

  return hasMembers;
}