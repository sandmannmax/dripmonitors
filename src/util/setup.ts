import redis from 'redis';
import { Server, ServerCredentials } from '@grpc/grpc-js';
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

export async function Start() {
  ConfigSetup();

  const client = redis.createClient({
    host: config.redisHost,
    port: config.redisPort,
  });
  const subscriber = client.duplicate();

  const nikeMonitor = new NikeMonitor();
  const monitorService = new MonitorService(nikeMonitor);
  const redisController = new RedisController({ client: subscriber, monitorService });
  const productRepo = new ProductRepo(client);
  const filterRepo = new FilterRepo(client);

  const productsService = new ProductsService(productRepo);
  const filtersService = new FiltersService(filterRepo);
  const monitorServer = new MonitorServer({ productsService, filtersService });

  GrpcSetup({ monitorServer });
}

function GrpcSetup({ monitorServer }: { monitorServer: MonitorServer}) {
  const server = new Server();
  server.addService(MonitorServiceService, {
    getProducts: monitorServer.getProducts,
    addMonitoredProduct: monitorServer.addMonitoredProduct,
    removeMonitoredProduct: monitorServer.removeMonitoredProduct,
    getFilters: monitorServer.getFilters,
    addFilter: monitorServer.addFilter,
    removeFilter: monitorServer.removeFilter,
  });
  server.bindAsync(`0.0.0.0:${config.port}`, ServerCredentials.createInsecure(), () => {
    server.start();
  });
}
