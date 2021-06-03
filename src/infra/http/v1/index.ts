import { Router } from 'express';
import { Auth } from '../../../auth';
import { MonitorsourceService } from '../../../modules/monitormanagement/application/services/MonitorsourceService';
import { MonitorsourceController } from '../../../modules/monitormanagement/infra/controller/MonitorsourceController';
import { FilterRepo } from '../../../modules/monitormanagement/infra/repos/FilterRepo';
import { MonitorpageAllocationRepo } from '../../../modules/monitormanagement/infra/repos/MonitorpageAllocationRepo';
import { MonitorsourceRepo } from '../../../modules/monitormanagement/infra/repos/MonitorsourceRepo';
import { MonitorService } from '../../../modules/monitors/application/services/MonitorService';
import { MonitorController } from '../../../modules/monitors/infra/controllers/MonitorController';
import { MonitorRepo } from '../../../modules/monitors/infra/repos/MonitorRepo';
import { RoleRepo } from '../../../modules/monitors/infra/repos/RoleRepo';
import { MonitorpageService } from '../../../modules/monitormanagement/infra/services/MonitorpageService';
import { NotificationService } from '../../../modules/monitors/infra/services/NotificationService';
import { WebhookChecker } from '../../../modules/monitors/infra/services/WebhookChecker';
import { UserService } from '../../../modules/users/application/services/UserService';
import { UserController } from '../../../modules/users/infra/controllers/UserController';
import { ServerRepo } from '../../../modules/users/infra/repos/ServerRepo';
import { UserRepo } from '../../../modules/users/infra/repos/UserRepo';
// @ts-ignore
import config from '../../sequelize/config/config';
import models from '../../sequelize/models';
import { MonitorpageController } from '../../../modules/monitormanagement/infra/controller/MonitorpageController';

function createV1Router(): Router {
  const v1Router = Router();

  v1Router.use(Auth.CheckJWT);

  const serverRepo = new ServerRepo(models);
  const userRepo = new UserRepo(config.connection, models, serverRepo);
  const userService = new UserService(userRepo);
  const userController = new UserController(userService);
  v1Router.use('/user', userController.GetRouter());

  const roleRepo = new RoleRepo(models);
  const monitorRepo = new MonitorRepo(config.connection, models, roleRepo);
  const filterRepo = new FilterRepo(models);
  const monitorpageAllocationRepo = new MonitorpageAllocationRepo(models, filterRepo);
  const monitorsourceRepo = new MonitorsourceRepo(config.connection, models, monitorpageAllocationRepo);
  const monitorpageService = new MonitorpageService();
  const notificationService = new NotificationService()
  const monitorsourceService = new MonitorsourceService(monitorsourceRepo, monitorpageService, notificationService);
  const webhookChecker = new WebhookChecker();
  const monitorService = new MonitorService(monitorRepo, monitorsourceService, userService, webhookChecker);
  monitorsourceService.setMonitorService(monitorService);
  const monitorController = new MonitorController(monitorService);
  v1Router.use('/monitor', monitorController.GetRouter());

  const monitorsourceController = new MonitorsourceController(monitorsourceService);
  v1Router.use('/monitorsource', monitorsourceController.GetRouter());

  const monitorpageController = new MonitorpageController(monitorpageService);
  v1Router.use('/monitorpage', monitorpageController.GetRouter());

  return v1Router;
}

export default createV1Router();