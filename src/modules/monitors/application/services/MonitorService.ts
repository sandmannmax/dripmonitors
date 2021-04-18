import { DiscordId } from '../../../../core/base/DiscordId';
import { Uuid } from '../../../../core/base/Uuid';
import { IMonitorsourceService } from '../../../monitormanagement/application/services/MonitorsourceService';
import { IUserService } from '../../../users/application/services/UserService';
import { ImageUrl } from '../../domain/models/ImageUrl';
import { Monitor } from '../../domain/models/Monitor';
import { NotificationTarget } from '../../domain/models/NotificationTarget';
import { Role } from '../../domain/models/Role';
import { IMonitorRepo } from '../../domain/repos/IMonitorRepo';
import { AddRoleCommandDTO } from '../dto/AddRoleCommandDTO';
import { DeleteRoleCommandDTO } from '../dto/DeleteRoleCommandDTO';
import { NotifyMonitorsCommandDTO } from '../dto/NotifyMonitorsCommandDTO';
import { StartMonitorCommandDTO } from '../dto/StartMonitorCommandDTO';
import { StopMonitorCommandDTO } from '../dto/StopMonitorCommandDTO';
import { UpdateImageCommandDTO } from '../dto/UpdateImageCommandDTO';
import { UpdateNameCommandDTO } from '../dto/UpdateNameCommandDTO';
import { UpdateWebhookCommandDTO } from '../dto/UpdateWebhookCommandDTO';
import { IWebhookChecker } from '../interface/IWebhookChecker';
import { CreateMonitorUseCase, CreateMonitorUseCaseRequest } from '../useCases/createMonitor/CreateMonitorUseCase';
import { MonitorDTO } from '../useCases/getMonitors/dtos/MonitorDTO';
import { GetMonitorsUseCase, GetMonitorsUseCaseRequest } from '../useCases/getMonitors/GetMonitorsUseCase';
import { MonitorForNotifyDTO } from '../useCases/getMonitorsForNotify/dtos/MonitorForNotifyDTO';
import { GetMonitorsForNotifyUseCase, GetMonitorsForNotifyUseCaseRequest } from '../useCases/getMonitorsForNotify/GetMonitorsForNotifyUseCase';

export interface IMonitorService {
  getMonitors(request: GetMonitorsUseCaseRequest): Promise<MonitorDTO[]>;
  getMonitorsForNotify(request: GetMonitorsForNotifyUseCaseRequest): Promise<MonitorForNotifyDTO[]>;
  createMonitor(request: CreateMonitorUseCaseRequest): Promise<void>;
  updateName(command: UpdateNameCommandDTO): Promise<void>;
  updateImage(command: UpdateImageCommandDTO): Promise<void>;
  updateWebhook(command: UpdateWebhookCommandDTO): Promise<void>;
  addRole(command: AddRoleCommandDTO): Promise<void>;
  deleteRole(command: DeleteRoleCommandDTO): Promise<void>;
  startMonitor(command: StartMonitorCommandDTO): Promise<void>;
  stopMonitor(command: StopMonitorCommandDTO): Promise<void>;
}

export class MonitorService implements IMonitorService {
  private monitorRepo: IMonitorRepo;
  private getMonitorsUseCase: GetMonitorsUseCase;
  private getMonitorsForNotifyUseCase: GetMonitorsForNotifyUseCase;
  private createMonitorUseCase: CreateMonitorUseCase;

  constructor(
    monitorRepo: IMonitorRepo,
    monitorsourceService: IMonitorsourceService,
    userService: IUserService,
    webhookChecker: IWebhookChecker,
  ) {
    this.monitorRepo = monitorRepo;
    this.getMonitorsUseCase = new GetMonitorsUseCase(monitorRepo, monitorsourceService);
    this.getMonitorsForNotifyUseCase = new GetMonitorsForNotifyUseCase(monitorRepo);
    this.createMonitorUseCase = new CreateMonitorUseCase(monitorRepo, userService, webhookChecker);
  }

  public async getMonitors(request: GetMonitorsUseCaseRequest): Promise<MonitorDTO[]> { return await this.getMonitorsUseCase.execute(request); }

  public async getMonitorsForNotify(request: GetMonitorsForNotifyUseCaseRequest): Promise<MonitorForNotifyDTO[]> { return await this.getMonitorsForNotifyUseCase.execute(request); }

  public async createMonitor(request: CreateMonitorUseCaseRequest): Promise<void> { await this.createMonitorUseCase.execute(request); }

  public async updateName(command: UpdateNameCommandDTO): Promise<void> {
    const monitor = await this.getMonitor(command.userDiscordId, command.serverUuid, command.monitorUuid);
    monitor.updateName(command.name);
    await this.monitorRepo.save(monitor);
  }
  
  public async updateImage(command: UpdateImageCommandDTO): Promise<void> {
    const monitor = await this.getMonitor(command.userDiscordId, command.serverUuid, command.monitorUuid);
    const newImage = ImageUrl.create({ value: command.image });
    monitor.updateImage(newImage);
    await this.monitorRepo.save(monitor);
  }
  
  public async updateWebhook(command: UpdateWebhookCommandDTO): Promise<void> {
    const monitor = await this.getMonitor(command.userDiscordId, command.serverUuid, command.monitorUuid);
    const newNotificationTarget = NotificationTarget.createFromUrl({ webhookUrl: command.webhook, isInvalid: false });
    monitor.updateNotificationTarget(newNotificationTarget);
    await this.monitorRepo.save(monitor);
  }
  
  public async addRole(command: AddRoleCommandDTO): Promise<void> {
    const monitor = await this.getMonitor(command.userDiscordId, command.serverUuid, command.monitorUuid);
    const roleDiscordId = DiscordId.create(command.roleDiscordId);
    const role = Role.create({ discordId: roleDiscordId, name: command.roleName });
    monitor.addRole(role);
    await this.monitorRepo.save(monitor);
  }
  
  public async deleteRole(command: DeleteRoleCommandDTO): Promise<void> {
    const monitor = await this.getMonitor(command.userDiscordId, command.serverUuid, command.monitorUuid);
    const roleUuid = Uuid.create({ from: 'uuid', uuid: command.roleUuid });
    monitor.removeRole(roleUuid);
    await this.monitorRepo.save(monitor);
  }
  
  public async startMonitor(command: StartMonitorCommandDTO): Promise<void> {
    const monitor = await this.getMonitor(command.userDiscordId, command.serverUuid, command.monitorUuid);
    monitor.startMonitor();
    await this.monitorRepo.save(monitor);
  }
  
  public async stopMonitor(command: StopMonitorCommandDTO): Promise<void> {
    const monitor = await this.getMonitor(command.userDiscordId, command.serverUuid, command.monitorUuid);
    monitor.stopMonitor();
    await this.monitorRepo.save(monitor);
  }  

  private async getMonitor(userDiscordIdString: string, serverUuidString: string, monitorUuidString: string): Promise<Monitor> {
    const userDiscordId = DiscordId.create(userDiscordIdString);
    const userUuid = Uuid.create({ from: 'base', base: userDiscordId.toString() });
    const serverUuid = Uuid.create({ from: 'uuid', uuid: serverUuidString });
    const monitorUuid = Uuid.create({ from: 'uuid', uuid: monitorUuidString });
    return await this.monitorRepo.getMonitorByUuid(userUuid, serverUuid, monitorUuid);
  }
}