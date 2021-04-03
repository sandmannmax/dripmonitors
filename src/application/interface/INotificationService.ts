import { Product } from '../../domain/models/Product';
import { ChannelDTO } from '../dto/ChannelDTO';
import { WebhookDTO } from '../dto/WebhookDTO';

export interface INotificationService {
  notify(product: Product, target: ChannelDTO | WebhookDTO): void;
}