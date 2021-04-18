import { UseCase } from '../../../../../core/base/UseCase';
import { MonitorsourceUuid } from '../../../../monitormanagement/domain/models/MonitorsourceUuid';
import { Monitor } from '../../../domain/models/Monitor';
import { IMonitorRepo } from '../../../domain/repos/IMonitorRepo';
import { MonitorForNotifyDTO } from './dtos/MonitorForNotifyDTO';

export interface GetMonitorsForNotifyUseCaseRequest {
  monitorsourceUuids: MonitorsourceUuid[]
}

export class GetMonitorsForNotifyUseCase implements UseCase<GetMonitorsForNotifyUseCaseRequest, MonitorForNotifyDTO[]> {
  private monitorRepo: IMonitorRepo;

  constructor(monitorRepo: IMonitorRepo) {
    this.monitorRepo = monitorRepo;
  }

  public async execute(request: GetMonitorsForNotifyUseCaseRequest): Promise<MonitorForNotifyDTO[]> {
    const monitorPromises: Promise<Monitor[]>[] = []; 

    for (let i = 0; i < request.monitorsourceUuids.length; i++) {
      monitorPromises.push(this.monitorRepo.getMonitorsByMonitorsourceUuid(request.monitorsourceUuids[i]));
    }

    const monitorArrays = await Promise.all(monitorPromises);
    const monitors: MonitorForNotifyDTO[] = [];

    for (let i = 0; i < monitorArrays.length; i++) {
      for (let j = 0; j < monitorArrays.length; j++) {
        const monitor = monitorArrays[i][j];
        if (monitor.canNotify() === true) {
          monitors.push({
            name: monitor.name,
            image: monitor.image.value,
            webhookId: monitor.notificationTarget.webhookId.toString(),
            webhookToken: monitor.notificationTarget.webhookToken,
            roles: monitor.roles.map(r => r.discordId.toString()),
          });
        }
        
      }
    }

    return monitors;
  }
}