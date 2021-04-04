import redis from 'redis';
import { sendUnaryData, Server, ServerCredentials, ServerUnaryCall } from '@grpc/grpc-js';
import config, { ConfigSetup } from './config';
import { RedisController } from '../infra/controllers/RedisController';
import { MonitorServiceService } from '../proto/monitor/v1/monitor_grpc_pb';
import { MonitorServer } from '../infra/controllers/MonitorServer';
import { ProductsService } from '../application/services/ProductsService';
import { FiltersService } from '../application/services/FiltersService';
import { MonitorService } from '../application/services/MonitorService';
import { NikeMonitor } from '../application/monitors/NikeMonitor';
import { ProductRepo } from '../infra/repos/ProductRepo';
import { FilterRepo } from '../infra/repos/FilterRepo';
import { AddFilterRequest, AddFilterResponse, ActivateProductMonitoringRequest, ActivateProductMonitoringResponse, GetFiltersRequest, GetFiltersResponse, GetProductsRequest, GetProductsResponse, RemoveFilterRequest, RemoveFilterResponse, DisableProductMonitoringRequest, DisableProductMonitoringResponse } from '../proto/monitor/v1/monitor_pb';
import { ScraperClientService } from '../infra/services/ScraperClientService';
import { DiscordService } from '../infra/services/DiscordService';
import { SupremeMonitor } from '../application/monitors/SupremeMonitor';
import { ZalandoMonitor } from '../application/monitors/ZalandoMonitor';
import { AfewMonitor } from '../application/monitors/AfewMonitor';
import { FootlockerMonitor } from '../application/monitors/FootlockerMonitor';

export async function Start(): Promise<void> {
  ConfigSetup();

  const client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
  });
  const subscriber = client.duplicate();

  const productRepo = new ProductRepo(client);
  const filterRepo = new FilterRepo(client);

  const discordService = new DiscordService();

  const scraperService = new ScraperClientService();
  const nikeMonitor = new NikeMonitor(scraperService, productRepo, filterRepo, discordService);
  const supremeMonitor = new SupremeMonitor(scraperService, productRepo, filterRepo, discordService);
  const zalandoMonitor = new ZalandoMonitor(scraperService, productRepo, filterRepo, discordService);
  const afewMonitor = new AfewMonitor(scraperService, productRepo, filterRepo, discordService);
  const footlockerMonitor = new FootlockerMonitor(scraperService, productRepo, filterRepo, discordService);
  const monitorService = new MonitorService(nikeMonitor, supremeMonitor, zalandoMonitor, afewMonitor, footlockerMonitor);
  const redisController = new RedisController({ client: subscriber, monitorService });

  const productsService = new ProductsService(productRepo);
  const filtersService = new FiltersService(filterRepo);
  const monitorServer = new MonitorServer({ productsService, filtersService });

  GrpcSetup({ monitorServer });
}

function GrpcSetup({ monitorServer }: { monitorServer: MonitorServer}) {
  const server = new Server();
  server.addService(MonitorServiceService, {
    getProducts: (
      call: ServerUnaryCall<GetProductsRequest, GetProductsResponse>,
      callback: sendUnaryData<GetProductsResponse>,
    ) => monitorServer.getProducts(call, callback),
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
  });
  server.bindAsync(`0.0.0.0:${config.port}`, ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
