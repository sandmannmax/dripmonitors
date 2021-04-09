import redis from 'redis';
import { sendUnaryData, Server, ServerCredentials, ServerUnaryCall } from '@grpc/grpc-js';
import config, { ConfigSetup } from './config';
import { RedisController } from '../infra/controllers/RedisController';
import { MonitorServiceService } from '../proto/monitor/v1/monitor_grpc_pb';
import { MonitorServer } from '../infra/controllers/MonitorServer';
import { ProductsService } from '../application/services/ProductsService';
import { MonitorpageService } from '../application/services/MonitorpageService';
import { ProductRepo } from '../infra/repos/ProductRepo';
import { MonitorpageRepo } from '../infra/repos/MonitorpageRepo';
import { AddFilterRequest, AddFilterResponse, ActivateProductMonitoringRequest, ActivateProductMonitoringResponse, GetFiltersRequest, GetFiltersResponse, GetProductsRequest, GetProductsResponse, RemoveFilterRequest, RemoveFilterResponse, DisableProductMonitoringRequest, DisableProductMonitoringResponse, GetMonitorpagesRequest, GetMonitorpagesResponse, GetMonitorpageRequest, GetMonitorpageResponse, GetProductRequest, GetProductResponse, GetUrlsResponse, GetUrlsRequest, AddUrlRequest, AddUrlResponse, RemoveUrlRequest, RemoveUrlResponse, StartMonitorpageRequest, StartMonitorpageResponse, StopMonitorpageRequest, StopMonitorpageResponse } from '../proto/monitor/v1/monitor_pb';
import { ScraperClientService } from '../infra/services/ScraperClientService';
import { NotificationService } from '../infra/services/NotificationService';
import { MonitorpageSetup } from './Monitorpages';
import { ScheduleService } from '../infra/services/ScheduleService';

export async function Start(): Promise<void> {
  ConfigSetup();

  const client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
  });
  const subscriber = client.duplicate();

  const productRepo = new ProductRepo(client);
  const scraperService = new ScraperClientService();
  const notificationService = new NotificationService();
  const monitorpageSetups = MonitorpageSetup(productRepo, scraperService, notificationService);

  const monitorpageRepo = new MonitorpageRepo(monitorpageSetups, client);
  const scheduleService = new ScheduleService();
  const monitorpageService = new MonitorpageService(monitorpageRepo, scheduleService);

  const redisController = new RedisController({ client: subscriber, monitorpageService });

  const productsService = new ProductsService(productRepo);
  const monitorServer = new MonitorServer({ monitorpageService, productsService });

  GrpcSetup(monitorServer);
}

function GrpcSetup(monitorServer: MonitorServer) {
  const server = new Server();
  server.addService(MonitorServiceService, {
    getMonitorpages: (call: ServerUnaryCall<GetMonitorpagesRequest, GetMonitorpagesResponse>, callback: sendUnaryData<GetMonitorpagesResponse>) => monitorServer.getMonitorpages(call, callback),
    getMonitorpage: (call: ServerUnaryCall<GetMonitorpageRequest, GetMonitorpageResponse>, callback: sendUnaryData<GetMonitorpageResponse>) => monitorServer.getMonitorpage,
    getProducts: (
      call: ServerUnaryCall<GetProductsRequest, GetProductsResponse>,
      callback: sendUnaryData<GetProductsResponse>,
    ) => monitorServer.getProducts(call, callback),
    getProduct: (call: ServerUnaryCall<GetProductRequest, GetProductResponse>, callback: sendUnaryData<GetProductResponse>) => monitorServer.getProduct(call, callback),
    activateProductMonitoring: (
      call: ServerUnaryCall<ActivateProductMonitoringRequest, ActivateProductMonitoringResponse>,
      callback: sendUnaryData<ActivateProductMonitoringResponse>,
    ) => monitorServer.activateProductMonitoring(call, callback),
    disableProductMonitoring: (
      call: ServerUnaryCall<DisableProductMonitoringRequest, DisableProductMonitoringResponse>,
      callback: sendUnaryData<DisableProductMonitoringResponse>,
    ) => monitorServer.disableProductMonitoring(call, callback),
    getFilters: (
      call: ServerUnaryCall<GetFiltersRequest, GetFiltersResponse>,
      callback: sendUnaryData<GetFiltersResponse>,
    ) => monitorServer.getFilters(call, callback),
    addFilter: (
      call: ServerUnaryCall<AddFilterRequest, AddFilterResponse>,
      callback: sendUnaryData<AddFilterResponse>,
    ) => monitorServer.addFilter(call, callback),
    removeFilter: (
      call: ServerUnaryCall<RemoveFilterRequest, RemoveFilterResponse>,
      callback: sendUnaryData<RemoveFilterResponse>,
    ) => monitorServer.removeFilter(call, callback),
    getUrls: (call: ServerUnaryCall<GetUrlsRequest, GetUrlsResponse>, callback: sendUnaryData<GetUrlsResponse>) => monitorServer.getUrls(call, callback),
    addUrl: (call: ServerUnaryCall<AddUrlRequest, AddUrlResponse>, callback: sendUnaryData<AddUrlResponse>) => monitorServer.addUrl(call, callback),
    removeUrl: (call: ServerUnaryCall<RemoveUrlRequest, RemoveUrlResponse>, callback: sendUnaryData<RemoveUrlResponse>) => monitorServer.removeUrl(call, callback),
    startMonitorpage: (call: ServerUnaryCall<StartMonitorpageRequest, StartMonitorpageResponse>, callback: sendUnaryData<StartMonitorpageResponse>) => monitorServer.startMonitorpage(call, callback),
    stopMonitorpage: (call: ServerUnaryCall<StopMonitorpageRequest, StopMonitorpageResponse>, callback: sendUnaryData<StopMonitorpageResponse>) => monitorServer.stopMonitorpage(call,callback),
  });
  server.bindAsync(`0.0.0.0:${config.port}`, ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
