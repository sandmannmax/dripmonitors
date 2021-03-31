import { ChannelDTO } from './ChannelDTO';

export interface MonitorJobContentDTO {
  urls: string[];
  proxy: string;
  isHtml: boolean;
  channels: ChannelDTO[];
}
