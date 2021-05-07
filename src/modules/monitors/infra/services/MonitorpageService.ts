import { MonitorServiceClient } from "../../../../proto/monitor/v1/monitor_grpc_pb";
import { IMonitorpageService } from "../../../monitormanagement/application/interfaces/IMonitorpageService";
import { MonitorpageUuid } from "../../../monitormanagement/domain/models/MonitorpageUuid";
import config from '../../../../utils/config';
import { credentials } from "@grpc/grpc-js";
import { GetMonitorpageRequest } from "../../../../proto/monitor/v1/monitor_pb";
import { MonitorpageDTO } from "../../../monitormanagement/application/dto/MonitorpageDTO";

export class MonitorpageService implements IMonitorpageService {
  private monitorServiceClient: MonitorServiceClient;

  constructor() {
    this.monitorServiceClient = new MonitorServiceClient(`${config.monitorHost}:${config.monitorPort}`, credentials.createInsecure());
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
            const monitorpageDTO: MonitorpageDTO = {
            };
  
            resolve(monitorpageDTO);
          }
        }
      });
    });
  }
}