import { NotifySubjectDTO } from "../../application/dto/NotifySubjectDTO";
import { INotificationService } from "../../application/interface/INotificationService";

export class NotificationService implements INotificationService {
  notify(subject: NotifySubjectDTO): Promise<void> {
    throw new Error("Method not implemented.");
  }

}