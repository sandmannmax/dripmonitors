import { DiscordId } from "../../../../core/base/DiscordId";
import { NotificationTarget } from "../../domain/models/NotificationTarget";
import { NotificationTargetDTO } from "../useCases/getMonitors/dtos/NotificationTargetDTO";

export class NotificationTargetMap {
  public static toDTO(notificationTarget: NotificationTarget): NotificationTargetDTO {
    return {
      webhookId: notificationTarget.webhookId.toString(),
      webhookToken: notificationTarget.webhookToken,
      isInvalid: notificationTarget.isInvalid,
    };
  }

  public static toAggregate(raw: any): NotificationTarget {
    let notificationTarget = NotificationTarget.create({
      webhookId: DiscordId.create(raw.webhook_id),
      webhookToken: raw.webhook_token,
      isInvalid: raw.is_invalid,
    });
    
    return notificationTarget;
  }
}