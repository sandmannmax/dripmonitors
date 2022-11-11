import { NotifySubjectDTO } from '../dto/NotifySubjectDTO';

export interface INotificationService {
  notify(subject: NotifySubjectDTO): Promise<void>;
}