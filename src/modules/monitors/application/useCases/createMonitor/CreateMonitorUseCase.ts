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
import { Validator } from "../../../../../core/logic/Validator";
import { DiscordWebhook } from "../../../../../core/base/DiscordWebhook";
import { logger } from "../../../../../utils/logger";
import { IMonitorsourceRepo } from "../../../../monitormanagement/domain/repos/IMonitorsourceRepo";
import { MonitorsourceNotFoundException } from "../../../../monitormanagement/domain/exceptions/MonitorsourceNotFoundException";
import { IMonitorsourceService } from "../../../../monitormanagement/application/services/MonitorsourceService";

export interface CreateMonitorUseCaseRequest {
  userDiscordId: string;
  serverUuid: string;
  name: string;
  image: string;
  webhook: string;
  monitorsourceUuid: string;
}

export class CreateMonitorUseCase implements UseCase<CreateMonitorUseCaseRequest, void> {
  private monitorRepo: IMonitorRepo;
  private monitorsourceService: IMonitorsourceService;
  private userService: IUserService;
  private webhookChecker: IWebhookChecker;

  constructor(monitorRepo: IMonitorRepo, monitorsourceService: IMonitorsourceService, userService: IUserService, webhookChecker: IWebhookChecker) {
    this.monitorRepo = monitorRepo;
    this.monitorsourceService = monitorsourceService;
    this.userService = userService;
    this.webhookChecker = webhookChecker;
  }

  public async execute(request: CreateMonitorUseCaseRequest): Promise<void> {
    const userDiscordId = DiscordId.create(request.userDiscordId, 'userDiscordId');
    const userUuid = Uuid.create({ from: 'base', base: userDiscordId.toString(), name: 'userUuid' });
    const serverUuid = ServerUuid.create(Uuid.create({ from: 'uuid', uuid: request.serverUuid, name: 'serverUuid' }));
    const image = ImageUrl.create({ value: request.image });    
    const discordWebhook = DiscordWebhook.create(request.webhook, "webhook");

    const webhookProperties = await this.webhookChecker.getWebhookProperties(discordWebhook);  

    if (!webhookProperties.isExisting || webhookProperties.serverId == undefined) {
      throw new InvalidWebhookUrlException('Webhook is not existing.');
    } else {
      await this.userService.checkWebhookUsability({ userUuid: userUuid.toString(), serverUuid: serverUuid.uuid.toString(), webhookServerDiscordId: webhookProperties.serverId });
    }

    const notificationTarget = NotificationTarget.createFromUrl({ webhookUrl: request.webhook, isInvalid: false });
    const monitorsource = MonitorsourceUuid.create(Uuid.create({ from: 'uuid', uuid: request.monitorsourceUuid, name: 'monitorsourceUuid' }));

    const monitorsourceExists = await this.monitorsourceService.checkMonitorsourceExisting(monitorsource.uuid);

    if (!monitorsourceExists) {
      throw new MonitorsourceNotFoundException(`Monitorsource with uuid ${monitorsource.uuid.toString()} is not existing.`);
    }

    logger.info(notificationTarget)

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