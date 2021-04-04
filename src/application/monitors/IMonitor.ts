import { MonitorJobContentDTO } from "../dto/MonitorJobContentDTO";

export interface IMonitor {
  run({ content }: { content: MonitorJobContentDTO }): void;
}