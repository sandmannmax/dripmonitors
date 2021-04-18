import { DiscordId } from "../../../../../core/base/DiscordId";
import { UseCase } from "../../../../../core/base/UseCase";
import { Uuid } from "../../../../../core/base/Uuid";
import { InvalidWebhookUrlException } from "../../../domain/exceptions/InvalidWebhookUrlException";
import { ServerUuid } from "../../../../users/domain/models/ServerUuid";
import { ImageUrl } from "../../../domain/models/ImageUrl";
import { IMonitorRepo } from "../../../domain/repos/IMonitorRepo";
import { IWebhookChecker } from "../../interface/IWebhookChecker";
import { IUserService } from "../../../../users/application/services/UserService";
import { NotificationTarget } from "../../../domain/models/NotificationTarget";
import { MonitorsourceUuid } from "../../../../monitormanagement/domain/models/MonitorsourceUuid";
import { Monitor } from "../../../domain/models/Monitor";

export interface CreateMonitorUseCaseRequest {
  userDiscordId: string;
  serverUuid: string;
  name: string;
  image: string;
  webhook: string;
  monitorpageUuid: string;
}

export class CreateMonitorUseCase implements UseCase<CreateMonitorUseCaseRequest, void> {
  private monitorRepo: IMonitorRepo;
  private userService: IUserService;
  private webhookChecker: IWebhookChecker;

  constructor(monitorRepo: IMonitorRepo, userService: IUserService, webhookChecker: IWebhookChecker) {
    this.monitorRepo = monitorRepo;
    this.userService = userService;
    this.webhookChecker = webhookChecker;
  }

  public async execute(request: CreateMonitorUseCaseRequest): Promise<void> {
    const userDiscordId = DiscordId.create(request.userDiscordId);
    const userUuid = Uuid.create({ from: 'base', base: userDiscordId.toString() });
    const serverUuid = ServerUuid.create(Uuid.create({ from: 'uuid', uuid: request.serverUuid }));
    const image = ImageUrl.create({ value: request.image });

    const webhookProperties = await this.webhookChecker.getWebhookProperties(request.webhook);

    if (!webhookProperties.isExisting || webhookProperties.serverId == undefined) {
      throw new InvalidWebhookUrlException('Webhook is not existing.');
    } else {
      await this.userService.checkWebhookUsability({ userUuid: userUuid.toString(), serverUuid: serverUuid.uuid.toString(), webhookServerDiscordId: webhookProperties.serverId });
    }

    const notificationTarget = NotificationTarget.createFromUrl({ webhookUrl: request.webhook, isInvalid: false });
    const monitorsource = MonitorsourceUuid.create(Uuid.create({ from: 'uuid', uuid: request.monitorpageUuid }));

    const newMonitor = Monitor.create({
      serverUuid,
      name: request.name,
      image,
      running: false,
      notificationTarget,
      roles: [],
      monitorsource,
    });

    await this.monitorRepo.save(newMonitor);
  }
}