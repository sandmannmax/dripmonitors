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

export class MonitorsourceController {
  private router: Router;
  private monitorsourceService: IMonitorsourceService;

  constructor(
    monitorsourceService: IMonitorsourceService
  ) {
    this.router = Router({strict: true});
    this.monitorsourceService = monitorsourceService;

    this.router.get('/', async (req, res, next) => {
      try {
        const monitorsourceVisibleDTOs = await this.monitorsourceService.getVisibleMonitorsources();
        res.json(monitorsourceVisibleDTOs);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    const adminRouter = Router({strict: true});

    adminRouter.get('/', async (req, res, next) => {
      try {
        const monitorsourceDTOs = await this.monitorsourceService.getMonitorsources();
        res.json(monitorsourceDTOs);
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.post('/', async (req, res, next) => {
      const { name  } = req.body;
      try {
        await this.monitorsourceService.createMonitorsource({ name });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.delete('/:monitorsourceUuid', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      try {
        await this.monitorsourceService.deleteMonitorsource({ monitorsourceUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.post('/:monitorsourceUuid/visible', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      try {
        await this.monitorsourceService.makeMonitorsourceVisible({ monitorsourceUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.post('/:monitorsourceUuid/invisible', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      try {
        await this.monitorsourceService.makeMonitorsourceInvisible({ monitorsourceUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.post('/:monitorsourceUuid/start', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      try {
        await this.monitorsourceService.startMonitorsource({ monitorsourceUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.post('/:monitorsourceUuid/stop', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      try {
        await this.monitorsourceService.stopMonitorsource({ monitorsourceUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.post('/:monitorsourceUuid/allocation', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      const { isFiltering, monitorpageUuid } = req.body;
      try {
        await this.monitorsourceService.addMonitorpageAllocation({ monitorsourceUuid, isFiltering, monitorpageUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.delete('/:monitorsourceUuid/allocation/:allocationUuid', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      const monitorpageAllocationUuid = req.params.allocationUuid;
      try {
        await this.monitorsourceService.removeMonitorpageAllocation({ monitorsourceUuid, monitorpageAllocationUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.post('/:monitorsourceUuid/allocation/:allocationUuid/filter', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      const monitorpageAllocationUuid = req.params.allocationUuid;
      const { filterValue } = req.body;
      try {
        await this.monitorsourceService.addFilterToMonitorpageAllocation({ monitorsourceUuid, monitorpageAllocationUuid, filterValue });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    adminRouter.delete('/:monitorsourceUuid/allocation/:allocationUuid/filter/:filterUuid', async (req, res, next) => {
      const monitorsourceUuid = req.params.monitorsourceUuid;
      const monitorpageAllocationUuid = req.params.allocationUuid;
      const filterUuid = req.params.filterUuid;
      try {
        await this.monitorsourceService.removeFilterToMonitorpageAllocation({ monitorsourceUuid, monitorpageAllocationUuid, filterUuid });
        res.status(200);
        res.end();
      } catch (error) {
        ExceptionHandling.HandleException({ error, next });

        next(error);
      }
    });

    this.router.use('/admin', adminRouter);
  }

  public GetRouter(): Router {
    return this.router;
  }
}