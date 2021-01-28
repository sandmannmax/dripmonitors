import { Router } from 'express';
import Container from 'typedi';
import { IError } from '../types/IError';
import { IsAuth } from '../middleware/IsAuth';
import { MonitorService } from '../services/MonitorService';
import { Queue } from 'bull';

export class MonitorRoutes {
  private router: Router;
  private monitorService: MonitorService;

  constructor(queue: Queue) {
    this.router = Router({strict: true});
    this.monitorService = new MonitorService(queue);

    this.router.get('/', IsAuth, async (req, res, next) => {
      let result = await this.monitorService.GetMonitors();
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });
    
    this.router.post('/job', IsAuth, async (req, res, next) => {
      let { monitorId, interval } = req.body;
      let result = await this.monitorService.CreateJob({ monitorId, interval });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });
    
    this.router.delete('/job', IsAuth, async (req, res, next) => {
      let { monitorId } = req.body;
      let result = await this.monitorService.DeleteJob({ monitorId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });
  }

  public GetRouter(): Router {
    return this.router;
  }
}