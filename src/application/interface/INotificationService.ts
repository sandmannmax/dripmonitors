import { NotifySubjectDTO } from '../dto/NotifySubjectDTO';
import { WebhookDTO } from '../dto/WebhookDTO';

export interface INotificationService {
  notify(subject: NotifySubjectDTO, targets: WebhookDTO[]): Promise<void>;
}