import { Router } from 'express';
import Container from 'typedi';
import { checkPermission } from '../auth/checkPermission';
import { IError } from '../types/IError';
import { MonitorService } from '../services/MonitorService';

export class MonitorpageRoutes {
  private router: Router;
  private monitorService: MonitorService;

  constructor() {
    this.router = Router({strict: true});
    this.monitorService = Container.get(MonitorService);

    this.router.get('/', checkPermission('read:monitorpage'), async (req, res, next) => {
      let result = await this.monitorService.GetMonitorpages();
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });
  }

  public GetRouter(): Router {
    return this.router;
  }
}