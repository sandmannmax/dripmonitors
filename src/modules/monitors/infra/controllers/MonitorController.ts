import { Router } from 'express';
import { IMonitorService } from '../../application/services/MonitorService';
import { UserDiscordIdExtractor } from '../../../../core/logic/UserDiscordIdExtractor';
import { NullOrUndefinedException } from '../../../../core/exceptions/NullOrUndefinedException';
import { IError } from '../../../../core/base/IError';
import { logger } from '../../../../utils/logger';
import { InvalidUuidException } from '../../../../core/exceptions/InvalidUuidException';
import { InvalidWebhookUrlException } from '../../domain/exceptions/InvalidWebhookUrlException';
import { InvalidDiscordWebhookException } from '../../../../core/exceptions/InvalidDiscordWebhookException';
import { ServerNotFoundException } from '../../../../core/exceptions/ServerNotFoundException';
import { InvalidUuidParametersException } from '../../../../core/exceptions/InvalidUuidParametersException';
import { MonitorsourceNotFoundException } from '../../../monitormanagement/domain/exceptions/MonitorsourceNotFoundException';
import { BaseException } from '../../../../core/exceptions/BaseException';
import { ExceptionHandling } from '../../../../core/exceptions/ExceptionHandling';

export class MonitorController {
  private router: Router;
  private monitorService: IMonitorService;

  constructor(
    monitorService: IMonitorService
  ) {
    this.router = Router({strict: true});
    this.monitorService = monitorService;

    this.router.get('/', async (req, res, next) => {
      const user = req['user'];
      const serverUuid = req.query.serverUuid as string;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        const monitorDTOs = await this.monitorService.getMonitors({ serverUuid, userDiscordId });
        res.json(monitorDTOs);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.post('/', async (req, res, next) => {
      const user = req['user'];
      const { serverUuid, imageUrl, monitorsourceUuid, name, webhook } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.createMonitor({ userDiscordId, serverUuid, image: imageUrl, monitorsourceUuid, name, webhook });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.patch('/:monitorUuid/name', async (req, res, next) => {
      const user = req['user'];
      const monitorUuid = req.params.monitorUuid;
      const { serverUuid, name } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.updateName({ userDiscordId, monitorUuid, name, serverUuid });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.patch('/:monitorUuid/image', async (req, res, next) => {
      const user = req['user'];
      const monitorUuid = req.params.monitorUuid;
      const { serverUuid, image } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.updateImage({ userDiscordId, monitorUuid, image, serverUuid });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.patch('/:monitorUuid/webhook', async (req, res, next) => {
      const user = req['user'];
      const monitorUuid = req.params.monitorUuid;
      const { serverUuid, webhook } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.updateWebhook({ userDiscordId, monitorUuid, webhook, serverUuid });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.post('/:monitorUuid/start', async (req, res, next) => {
      const user = req['user'];
      const monitorUuid = req.params.monitorUuid;
      const { serverUuid } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.startMonitor({ userDiscordId, monitorUuid, serverUuid });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.post('/:monitorUuid/stop', async (req, res, next) => {
      const user = req['user'];
      const monitorUuid = req.params.monitorUuid;
      const { serverUuid } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.stopMonitor({ userDiscordId, monitorUuid, serverUuid });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.post('/:monitorUuid/role', async (req, res, next) => {
      const user = req['user'];
      const monitorUuid = req.params.monitorUuid;
      const { serverUuid, roleDiscordId, roleName } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.addRole({ userDiscordId, monitorUuid, serverUuid, roleDiscordId, roleName });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.delete('/:monitorUuid/role/:roleUuid', async (req, res, next) => {
      const user = req['user'];
      const monitorUuid = req.params.monitorUuid;
      const roleUuid = req.params.roleUuid;
      const { serverUuid,  } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        await this.monitorService.deleteRole({ userDiscordId, monitorUuid, serverUuid, roleUuid });
        res.status(200);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });
  }

  public GetRouter(): Router {
    return this.router;
  }
}