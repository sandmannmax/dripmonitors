import { DatabaseProvider } from './provider/DatabaseProvider';
import { MonitorModel } from './model/Monitor';
import { DiscordService } from './services/DiscordService';
import { RedisService } from './services/RedisService';
import { SupremeMonitor } from './monitors/SupremeMonitor';
import { NikeMonitor } from './monitors/NikeMonitor';
import { SnipesMonitor } from './monitors/SnipesMonitor';
import config from './config';

const dbProvider = new DatabaseProvider(config.dbConnection, config.dbUser, config.dbPassword);
const monitorModel = new MonitorModel(dbProvider);
const discordService = new DiscordService();
const redisService = new RedisService();

// const supremeMonitor = new SupremeMonitor(monitorModel, discordService, redisService);
// supremeMonitor.Setup();
const nikeMonitor = new NikeMonitor(monitorModel, discordService, redisService);
nikeMonitor.Setup();
// const snipesMonitor = new SnipesMonitor(monitorModel, discordService, redisService);
// snipesMonitor.Setup();

setInterval(() => {
  // supremeMonitor.Run();
  nikeMonitor.Run();
  // snipesMonitor.Run();
}, 15 * 1000)