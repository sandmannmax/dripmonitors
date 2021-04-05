import { RunMonitorCommandDTO } from "../dto/RunMonitorCommandDTO";

export interface IMonitor {
  run(command: RunMonitorCommandDTO): void;
}