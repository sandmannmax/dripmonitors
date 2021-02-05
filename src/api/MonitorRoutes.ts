import { Router } from 'express';
import Container from 'typedi';
import { IError } from '../types/IError';
import { MonitorService } from '../services/MonitorService';
import { checkPermission } from '../auth/checkPermission';

export class MonitorRoutes {
  private router: Router;
  private monitorService: MonitorService;

  constructor() {
    this.router = Router({strict: true});
    this.monitorService = Container.get(MonitorService);

    this.router.get('/', checkPermission('read:monitor'), async (req, res, next) => {
      let user = req['user'];
      let result = await this.monitorService.GetMonitors({ user });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/', checkPermission('create:monitor'), async (req, res, next) => {
      let user = req['user'];
      let result = await this.monitorService.CreateMonitor({ user });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });
    
    this.router.patch('/:id', checkPermission('update:monitor'), async (req, res, next) => {
      let user = req['user'];
      let id = req.params.id;
      let { webHook, botName, botImage, running } = req.body;
      let result = await this.monitorService.UpdateMonitor({ id, user, webHook, botName, botImage, running });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/:id', checkPermission('delete:monitor'), async (req, res, next) => {
      let user = req['user'];
      let id = req.params.id;
      let result = await this.monitorService.DeleteMonitor({ id, user });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.get('/:id/source', checkPermission('read:monitorsource'), async (req, res, next) => {
      let user = req['user'];
      let monitorId = req.params.id;
      let result = await this.monitorService.GetMonitorSources({ user, monitorId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/:id/source', checkPermission('create:monitorsource'), async (req, res, next) => {
      let user = req['user'];
      let monitorId = req.params.id;
      let { productId, monitorpageId, all } = req.body;
      let result = await this.monitorService.CreateMonitorSource({ user, monitorId, productId, monitorpageId, all });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/:id/source/:sid', checkPermission('delete:monitorsource'), async (req, res, next) => {
      let user = req['user'];
      let monitorId = req.params.id;
      let id = req.params.sid;
      let result = await this.monitorService.DeleteMonitorSource({ user, id, monitorId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/:id/testmessage', checkPermission('send:monitortestmessage'), async (req, res, next) => {
      let user = req['user'];
      let id = req.params.id;
      let result = await this.monitorService.SendTestMessage({ id, user });
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