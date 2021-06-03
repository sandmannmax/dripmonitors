import { MonitorServiceClient } from "../../../../proto/monitor/v1/monitor_grpc_pb";
import { IMonitorpageService } from "../../../monitormanagement/application/interfaces/IMonitorpageService";
import { MonitorpageUuid } from "../../../monitormanagement/domain/models/MonitorpageUuid";
import config from '../../../../utils/config';
import { credentials } from "@grpc/grpc-js";
import { GetMonitorpageRequest, GetMonitorpagesRequest, Monitorpage } from "../../../../proto/monitor/v1/monitor_pb";
import { MonitorpageDTO } from "../../../monitormanagement/application/dto/MonitorpageDTO";
import { logger } from "../../../../utils/logger";

export class MonitorpageService implements IMonitorpageService {
  private monitorServiceClient: MonitorServiceClient;

  constructor() {
    this.monitorServiceClient = new MonitorServiceClient(`${config.monitorHost}:${config.monitorPort}`, credentials.createInsecure());
  }

  public getMonitorpages(): Promise<MonitorpageDTO[]> {
    return new Promise<MonitorpageDTO[]>((resolve, reject) => {  
      let request: GetMonitorpagesRequest = new GetMonitorpagesRequest();
  
      this.monitorServiceClient.getMonitorpages(request, (error, response) => {
        if (error) {
          reject(error);
        } else {
          const monitorpages = response.getMonitorpagesList();

          if (monitorpages === undefined) {
            reject("Monitorpages not found (undefined)");
          } else {
            const monitorpageDTOs: MonitorpageDTO[] = [];

            for (let i = 0; i < monitorpages.length; i++) {
              monitorpageDTOs.push(this.monitorpageToDTO(monitorpages[i]));
            }
  
            resolve(monitorpageDTOs);
          }
        }
      });
    });
  }

  public getMonitorpageByUuid(monitorpageUuid: MonitorpageUuid): Promise<MonitorpageDTO> {
    return new Promise<MonitorpageDTO>((resolve, reject) => {  
      let request: GetMonitorpageRequest = new GetMonitorpageRequest();
      request.setMonitorpageUuid(monitorpageUuid.uuid.toString());
  
      this.monitorServiceClient.getMonitorpage(request, (error, response) => {

        if (error) {
          reject(error);
        } else {
          const monitorpage = response.getMonitorpage();

          if (monitorpage === undefined) {
            reject("Monitorpage not existing (undefined)");
          } else {  
            resolve(this.monitorpageToDTO(monitorpage));
          }
        }
      });
    });
  }

  private monitorpageToDTO(monitorpage: Monitorpage): MonitorpageDTO {
    const monitorpageDTO: MonitorpageDTO = {
      uuid: monitorpage.getMonitorpageUuid(),
      name: monitorpage.getMonitorpageName(),
      displayName: monitorpage.getMonitorpageDisplayName(),
    };
    return monitorpageDTO;
  }
}