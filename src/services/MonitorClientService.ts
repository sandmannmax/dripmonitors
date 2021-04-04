import { credentials } from '@grpc/grpc-js';
import config from '../config';
import { ActivateProductMonitoringRequest, AddFilterRequest, DisableProductMonitoringRequest, Filter, GetFiltersRequest, GetProductsRequest, Product, RemoveFilterRequest } from '../proto/monitor/v1/monitor_pb';
import { MonitorServiceClient } from '../proto/monitor/v1/monitor_grpc_pb';


export class MonitorClientService {
  private monitorServiceClient: MonitorServiceClient;

  constructor() {
    this.monitorServiceClient = new MonitorServiceClient(`${config.monitorHost}:${config.monitorPort}`, credentials.createInsecure());
  }

  public GetProducts({ monitorpageId }: { monitorpageId: string }): Promise<Product[]> {
    return new Promise<Product[]>((resolve, reject) => {  
      let request: GetProductsRequest = new GetProductsRequest();
      request.setMonitorpageId(monitorpageId);
  
      this.monitorServiceClient.getProducts(request, (error, response) => {
        if (error) reject(error);
        else resolve(response.getProductsList());
      });
    });
  }

  public ActivateProductMonitoring({ id, monitorpageId }: { id: string, monitorpageId: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {  
      let request: ActivateProductMonitoringRequest = new ActivateProductMonitoringRequest();
      request.setId(id);
      request.setMonitorpageId(monitorpageId);
  
      this.monitorServiceClient.activateProductMonitoring(request, (error, response) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  public DisableProductMonitoring({ id, monitorpageId }: { id: string, monitorpageId: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {  
      let request: DisableProductMonitoringRequest = new DisableProductMonitoringRequest();
      request.setId(id);
      request.setMonitorpageId(monitorpageId);
  
      this.monitorServiceClient.disableProductMonitoring(request, (error, response) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }

  public GetFilters({ monitorpageId }: { monitorpageId: string }): Promise<Filter[]> {
    return new Promise<Filter[]>((resolve, reject) => {  
      let request: GetFiltersRequest = new GetFiltersRequest();
      request.setMonitorpageId(monitorpageId);
  
      this.monitorServiceClient.getFilters(request, (error, response) => {
        if (error) reject(error);
        else resolve(response.getFiltersList());
      });
    });
  }

  public AddFilter({ value, monitorpageId }: { value: string, monitorpageId: string }): Promise<Filter> {
    return new Promise<Filter>((resolve, reject) => {  
      let request: AddFilterRequest = new AddFilterRequest();
      request.setValue(value);
      request.setMonitorpageId(monitorpageId);
  
      this.monitorServiceClient.addFilter(request, (error, response) => {
        if (error) reject(error);
        else resolve(response.getFilter()!);
      });
    });
  }

  public RemoveFilter({ id, monitorpageId }: { id: string, monitorpageId: string }): Promise<void> {
    return new Promise<void>((resolve, reject) => {  
      let request: RemoveFilterRequest = new RemoveFilterRequest();
      request.setId(id);
      request.setMonitorpageId(monitorpageId);
  
      this.monitorServiceClient.removeFilter(request, (error, response) => {
        if (error) reject(error);
        else resolve();
      });
    });
  }
}

