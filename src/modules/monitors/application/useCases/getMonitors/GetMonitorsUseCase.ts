import { DiscordId } from '../../../../../core/base/DiscordId';
import { UseCase } from '../../../../../core/base/UseCase';
import { Uuid } from '../../../../../core/base/Uuid';
import { IMonitorsourceService } from '../../../../monitormanagement/application/services/MonitorsourceService';
import { IMonitorRepo } from '../../../domain/repos/IMonitorRepo';
import { MonitorDTO } from './dtos/MonitorDTO';
import { MonitorMap } from '../../mappers/MonitorMap';

export interface GetMonitorsUseCaseRequest {
  userDiscordId: string;
  serverUuid: string;
}

export class GetMonitorsUseCase implements UseCase<GetMonitorsUseCaseRequest, MonitorDTO[]> {
  private monitorRepo: IMonitorRepo;
  private monitorsourceService: IMonitorsourceService;

  constructor(monitorRepo: IMonitorRepo, monitorsourceService: IMonitorsourceService) {
    this.monitorRepo = monitorRepo;
    this.monitorsourceService = monitorsourceService;
  }

  public async execute(request: GetMonitorsUseCaseRequest): Promise<MonitorDTO[]> {
    const userDiscordId = DiscordId.create(request.userDiscordId);
    const userUuid = Uuid.create({ from: 'base', base: userDiscordId.toString() });
    const serverUuid = Uuid.create({ from: 'uuid', uuid: request.serverUuid });
    const monitors = await this.monitorRepo.getMonitors(userUuid, serverUuid);
    const monitorDTOs: MonitorDTO[] = [];
    const monitorsources = await this.monitorsourceService.getVisibleMonitorsources();
    for (let i = 0; i < monitors.length; i++) {
      const monitorsource = monitorsources.find(m => m.monitorsourceUuid === monitors[i].monitorsource.uuid.toString());
      let name = '';
      if (monitorsource !== undefined && monitorsource !== null) {
        name = monitorsource.name;
      }
      monitorDTOs.push(MonitorMap.toDTO(monitors[i], name));
    }
    return monitorDTOs;
  }
}