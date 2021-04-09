import { ClearScheduleCommandDTO } from "../../application/dto/ClearScheduleCommandDTO";
import { ScheduleCommandDTO } from "../../application/dto/ScheduleCommandDTO";
import { IScheduleService } from "../../application/interface/IScheduleService";

export class ScheduleService implements IScheduleService {
  schedule(command: ScheduleCommandDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }
  clearSchedule(command: ClearScheduleCommandDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

}