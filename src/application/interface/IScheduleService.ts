import { ClearScheduleCommandDTO } from '../dto/ClearScheduleCommandDTO';
import { ScheduleCommandDTO } from '../dto/ScheduleCommandDTO';

export interface IScheduleService {
  schedule(command: ScheduleCommandDTO): Promise<void>;
  clearSchedule(command: ClearScheduleCommandDTO): Promise<void>;
}