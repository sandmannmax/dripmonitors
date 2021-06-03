import { Router } from 'express';
import { UserDiscordIdExtractor } from '../../../../core/logic/UserDiscordIdExtractor';
import { NullOrUndefinedException } from '../../../../core/exceptions/NullOrUndefinedException';
import { IError } from '../../../../core/base/IError';
import { logger } from '../../../../utils/logger';
import { InvalidUuidException } from '../../../../core/exceptions/InvalidUuidException';
import { InvalidDiscordWebhookException } from '../../../../core/exceptions/InvalidDiscordWebhookException';
import { ServerNotFoundException } from '../../../../core/exceptions/ServerNotFoundException';
import { InvalidUuidParametersException } from '../../../../core/exceptions/InvalidUuidParametersException';
import { MonitorsourceNotFoundException } from '../../../monitormanagement/domain/exceptions/MonitorsourceNotFoundException';
import { BaseException } from '../../../../core/exceptions/BaseException';
import { ExceptionHandling } from '../../../../core/exceptions/ExceptionHandling';
import { IMonitorsourceService } from '../../application/services/MonitorsourceService';
import { IMonitorpageService } from '../../application/interfaces/IMonitorpageService';

export class MonitorpageController {
  private router: Router;
  private monitorpageService: IMonitorpageService;

  constructor(
    monitorpageService: IMonitorpageService
  ) {
    this.router = Router({strict: true});
    this.monitorpageService = monitorpageService;

    this.router.get('/', async (req, res, next) => {
      try {
        const monitorpageDTOs =  await this.monitorpageService.getMonitorpages();
        res.json(monitorpageDTOs);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    const adminRouter = Router({strict: true});

    // this.router.use('/admin', adminRouter);
  }

  public GetRouter(): Router {
    return this.router;
  }
}