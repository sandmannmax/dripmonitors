import { Uuid } from "../../../../core/base/Uuid";
import { logger } from "../../../../utils/logger";
import { IMonitorService } from "../../../monitors/application/services/MonitorService";
import { Filter } from "../../domain/models/Filter";
import { MonitorpageAllocation } from "../../domain/models/MonitorpageAllocation";
import { MonitorpageUuid } from "../../domain/models/MonitorpageUuid";
import { Monitorsource } from "../../domain/models/Monitorsource";
import { MonitorsourceUuid } from "../../domain/models/MonitorsourceUuid";
import { IMonitorsourceRepo } from "../../domain/repos/IMonitorsourceRepo";
import { AddFilterToMonitorpageAllocationCommandDTO } from "../dto/AddFilterToMonitorpageAllocationCommandDTO";
import { AddMonitorpageAllocationCommandDTO } from "../dto/AddMonitorpageAllocationCommandDTO";
import { CreateMonitorsourceCommandDTO } from "../dto/CreateMonitorsourceCommandDTO";
import { DeleteMonitorsourceCommandDTO } from "../dto/DeleteMonitorsourceCommandDTO";
import { GetMonitorsourcesForProductCommandDTO } from "../dto/GetMonitorsourcesForProductCommandDTO";
import { MakeMonitorsourceInvisibleCommandDTO } from "../dto/MakeMonitorsourceInvisbleCommandDTO";
import { MakeMonitorsourceVisibleCommandDTO } from "../dto/MakeMonitorsourceVisibleCommandDTO";
import { MonitorpageAllocationDTO } from "../dto/MonitorpageAllocationDTO";
import { MonitorsourceDTO } from "../dto/MonitorsourceDTO";
import { MonitorsourceVisibleDTO } from "../dto/MonitorsourceVisibleDTO";
import { NotifyForProductCommand } from "../dto/NotifyForProductCommand";
import { RemoveFilterToMonitorpageAllocationCommandDTO } from "../dto/RemoveFilterToMonitorpageAllocationCommandDTO";
import { RemoveMonitorpageAllocationCommandDTO } from "../dto/RemoveMonitorpageAllocationCommandDTO";
import { StartMonitorsourceCommandDTO } from "../dto/StartMonitorsourceCommandDTO";
import { StopMonitorsourceCommandDTO } from "../dto/StopMonitorsourceCommandDTO";
import { IMonitorpageService } from "../interfaces/IMonitorpageService";
import { Embed, INotificationService, NotificationCommand } from "../interfaces/INotificationService";
import { MonitorpageAllocationMap } from "../mappers/MonitorpageAllocationMap";
import { MonitorsourceMap } from "../mappers/MonitorsourceMap";

export interface IMonitorsourceService {
  getVisibleMonitorsources(): Promise<MonitorsourceVisibleDTO[]>;
  checkMonitorsourceExisting(uuid: Uuid): Promise<boolean>;
  getMonitorsources(): Promise<MonitorsourceDTO[]>;
  createMonitorsource(command: CreateMonitorsourceCommandDTO): Promise<void>;
  deleteMonitorsource(command: DeleteMonitorsourceCommandDTO): Promise<void>;
  makeMonitorsourceVisible(command: MakeMonitorsourceVisibleCommandDTO): Promise<void>;
  makeMonitorsourceInvisible(command: MakeMonitorsourceInvisibleCommandDTO): Promise<void>;
  startMonitorsource(command: StartMonitorsourceCommandDTO): Promise<void>;
  stopMonitorsource(command: StopMonitorsourceCommandDTO): Promise<void>;
  addMonitorpageAllocation(command: AddMonitorpageAllocationCommandDTO): Promise<void>;
  removeMonitorpageAllocation(command: RemoveMonitorpageAllocationCommandDTO): Promise<void>;
  addFilterToMonitorpageAllocation(command: AddFilterToMonitorpageAllocationCommandDTO): Promise<void>;
  removeFilterToMonitorpageAllocation(command: RemoveFilterToMonitorpageAllocationCommandDTO): Promise<void>;
  notifyForProduct(command: NotifyForProductCommand): Promise<void>;
}

export class MonitorsourceService implements IMonitorsourceService {
  private monitorsourceRepo: IMonitorsourceRepo;
  private monitorpageService: IMonitorpageService;
  private monitorService!: IMonitorService;
  private notificationService: INotificationService;

  constructor(
    monitorsourceRepo: IMonitorsourceRepo,
    monitorpageService: IMonitorpageService,
    notificationService: INotificationService,
  ) {
    this.monitorsourceRepo = monitorsourceRepo;
    this.monitorpageService = monitorpageService;
    this.notificationService = notificationService;
  }

  public setMonitorService(monitorService: IMonitorService) {
    this.monitorService = monitorService;
  }

  public async getVisibleMonitorsources(): Promise<MonitorsourceVisibleDTO[]> {
    const monitorsources = await this.monitorsourceRepo.getMonitorsources();

    const monitorsourceVisibleDTOs: MonitorsourceVisibleDTO[] = [];

    for (let i = 0; i < monitorsources.length; i++) {
      if (monitorsources[i].isVisible === true) {
        monitorsourceVisibleDTOs.push({ monitorsourceUuid: monitorsources[i].uuid.toString(), name: monitorsources[i].name });
      }
    }

    return monitorsourceVisibleDTOs;
  }

  public async checkMonitorsourceExisting(uuid: Uuid): Promise<boolean> {
    return await this.monitorsourceRepo.exists(uuid);
  }

  public async getMonitorsources(): Promise<MonitorsourceDTO[]> {
    const monitorsources = await this.monitorsourceRepo.getMonitorsources();
    const monitorsourceDTOPromises: Promise<MonitorsourceDTO>[] = [];

    for (let i = 0; i < monitorsources.length; i++) {
      monitorsourceDTOPromises.push(this.getMonitorsourceDTO(monitorsources[i]));
    }

    const monitorsourceDTOs: MonitorsourceDTO[] = await Promise.all(monitorsourceDTOPromises);

    return monitorsourceDTOs;
  }

  public async createMonitorsource(command: CreateMonitorsourceCommandDTO): Promise<void> {
    const newMonitorsource = Monitorsource.create({
      name: command.name,
      isSendingNotifications: false,
      isVisible: false,
      monitorpageAllocations: [],
    });
    await this.monitorsourceRepo.save(newMonitorsource);
  }

  public async deleteMonitorsource(command: DeleteMonitorsourceCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid, name: 'monitorsourceUuid' });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    logger.info('HERE')
    await this.monitorsourceRepo.delete(monitorsource);
  }

  public async makeMonitorsourceVisible(command: MakeMonitorsourceVisibleCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    monitorsource.makeVisible();
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async makeMonitorsourceInvisible(command: MakeMonitorsourceInvisibleCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    monitorsource.makeInvisible();
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async startMonitorsource(command: StartMonitorsourceCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    monitorsource.startMonitorsource();
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async stopMonitorsource(command: StopMonitorsourceCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    monitorsource.stopMonitorsource();
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async addMonitorpageAllocation(command: AddMonitorpageAllocationCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid, name: 'monitorsourceUuid' });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    const monitorpageUuid = MonitorpageUuid.create(Uuid.create({ from: 'uuid', uuid: command.monitorpageUuid, name: 'monitorpageUuid' }));
    await this.monitorpageService.getMonitorpageByUuid(monitorpageUuid);
    const monitorpageAllocation = MonitorpageAllocation.create({ monitorpageUuid, isFiltering: command.isFiltering, filters: [] });
    monitorsource.addMonitorpageAllocation(monitorpageAllocation);
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async removeMonitorpageAllocation(command: RemoveMonitorpageAllocationCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    const monitorpageAllocationUuid = Uuid.create({ from: 'uuid', uuid: command.monitorpageAllocationUuid });
    monitorsource.removeMonitorpageAllocation(monitorpageAllocationUuid);
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async addFilterToMonitorpageAllocation(command: AddFilterToMonitorpageAllocationCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid, name: 'monitorsourceUuid' });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    const monitorpageAllocationUuid = Uuid.create({ from: 'uuid', uuid: command.monitorpageAllocationUuid, name: 'monitorpageAllocationUuid' });
    const filter = Filter.create({ value: command.filterValue });
    monitorsource.addFilterToMonitorpageAllocation(monitorpageAllocationUuid, filter);
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async removeFilterToMonitorpageAllocation(command: RemoveFilterToMonitorpageAllocationCommandDTO): Promise<void> {
    const monitorsourceUuid = Uuid.create({ from: 'uuid', uuid: command.monitorsourceUuid });
    const monitorsource = await this.monitorsourceRepo.getMonitorsourceByUuid(monitorsourceUuid);
    const monitorpageAllocationUuid = Uuid.create({ from: 'uuid', uuid: command.monitorpageAllocationUuid });
    const filterUuid = Uuid.create({ from: 'uuid', uuid: command.filterUuid });
    monitorsource.deleteFilterFromMonitorpageAllocation(monitorpageAllocationUuid, filterUuid);
    await this.monitorsourceRepo.save(monitorsource);
  }

  public async notifyForProduct(command: NotifyForProductCommand) {
    const monitorsources = await this.getMonitorsourcesForProduct({ name: command.name, monitorpageUuid: command.monitorpageUuid });
    const monitorsourceUuids = monitorsources.map(m => MonitorsourceUuid.create(m.uuid));

    const monitors = await this.monitorService.getMonitorsForNotify({ monitorsourceUuids });
    const jobs: Promise<void>[] = [];

    monitors.forEach(monitor => {
      const notificationCommand: NotificationCommand = {
        embeds: this.createEmbeds(command),
        senderName: monitor.name,
        senderImg: monitor.image,
        webhookId: monitor.webhookId,
        webhookToken: monitor.webhookToken,
        message: this.createRoleMessage(monitor.roles),
      };
      jobs.push(this.notificationService.notify(notificationCommand))
    });

    await Promise.all(jobs);
  }

  private async getMonitorsourcesForProduct(command: GetMonitorsourcesForProductCommandDTO): Promise<Monitorsource[]> {
    const monitorsources = await this.monitorsourceRepo.getMonitorsources();
    const notifyMonitorsources: Monitorsource[] = [];
    const monitorpageUuid = Uuid.create({ from: 'uuid', uuid: command.monitorpageUuid });

    for (let i = 0; i < monitorsources.length; i++) {
      const needsNotify = monitorsources[i].checkShouldNotify(command.name, monitorpageUuid);
      if (needsNotify) {
        notifyMonitorsources.push(monitorsources[i]);
      }
    }

    return notifyMonitorsources;
  }

  private async getMonitorsourceDTO(monitorsource: Monitorsource): Promise<MonitorsourceDTO> {
    const monitorpageAllocationDTOs: MonitorpageAllocationDTO[] = [];

    for (let i = 0; i < monitorsource.monitorpageAllocations.length; i++) {
      const monitorpage = await this.monitorpageService.getMonitorpageByUuid(monitorsource.monitorpageAllocations[i].monitorpageUuid);
      monitorpageAllocationDTOs.push(MonitorpageAllocationMap.toDTO(monitorsource.monitorpageAllocations[i], monitorpage));
    }

    return MonitorsourceMap.toDTO(monitorsource, monitorpageAllocationDTOs);
  }

  private createEmbeds(command: NotifyForProductCommand): Embed[] {
    const embeds: Embed[] = [];


    let title = 'Lazy Monitors'; 
    if (command.name !== null && command.name !== '') {
      title = command.name;
    }

    let thumbnail = 'https://www.lazyshoebot.com/logoCircle.png';
    if (command.img !== null && command.img !== '') {
      title = command.img;
    }
    
    const color = '#db3e3e';
    const footerImg = 'https://www.lazyshoebot.com/logoCircle.png';

    const datetime = new Date();
    const dateTimeString = datetime.getDate() + '.' + (datetime.getMonth() + 1) + '.' + datetime.getFullYear() + ' ' + datetime.getUTCHours() + ':' + datetime.getMinutes() + ':' + datetime.getSeconds() + '.' + datetime.getMilliseconds() + ' UTC'
    const footerText = 'Lazy Monitors | ' + dateTimeString;
    const fields: { name: string, value: string}[] = [];

    fields.push({ name: 'Price', value: command.price });

    if (command.hasATC === true) {
      for (let i = 0; i < command.sizes.length; i++) {
        fields.push({ name: command.sizes[i].value, value: '[[ATC]](' + command.sizes[i].atc + ')' });
      }
    } else {
      let sizes = '';

      for (let i = 0; i < command.sizes.length; i++) {
        sizes += command.sizes[i].value;
        if (i != command.sizes.length - 1) {
          sizes += ' - '
        }
      }

      fields.push({ name: 'Sizes', value: sizes });
    }

    embeds.push({
      title,
      thumbnail,
      url: command.href,
      color,
      footerImg,
      footerText,
      fields,
    });

    return embeds;
  }

  private createRoleMessage(roleIds: string[]): string | null {  
    if (roleIds !== null && roleIds.length > 0) {
      return roleIds.map(roleId => "<@&" + roleId + ">").join(' ');
    }
    return null
  }
}