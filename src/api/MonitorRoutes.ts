import { Router } from 'express';
import Container from 'typedi';
import { IError } from '../types/IError';
import { MonitorService } from '../services/MonitorService';
import { Auth } from '../auth';

export class MonitorRoutes {
  private router: Router;
  private monitorService: MonitorService;

  constructor() {
    this.router = Router({strict: true});
    this.monitorService = Container.get(MonitorService);

    this.router.get('/', Auth.CheckPermission('read:monitor'), async (req, res, next) => {
      let user = req.user;
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

    this.router.post('/', Auth.CheckPermission('create:monitor'), async (req, res, next) => {
      let user = req.user;
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
    
    this.router.patch('/:id', Auth.CheckPermission('update:monitor'), async (req, res, next) => {
      let user = req.user;
      let id = req.params.id;
      let { webHook, botName, botImage, running, role } = req.body;
      let result = await this.monitorService.UpdateMonitor({ id, user, webHook, botName, botImage, running, role});
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/:id', Auth.CheckPermission('delete:monitor'), async (req, res, next) => {
      let user = req.user;
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

    this.router.get('/:id/role', Auth.CheckPermission('read:role'), async (req, res, next) => {
      let user = req.user;
      let id = req.params.id;
      let result = await this.monitorService.GetRoles({ user, id });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/:id/role', Auth.CheckPermission('create:role'), async (req, res, next) => {
      let user = req.user;
      let id = req.params.id;
      let { name, roleId } = req.body;
      let result = await this.monitorService.CreateRole({ user, id, name, roleId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });
    
    this.router.patch('/:id/role/:rid', Auth.CheckPermission('update:monitor'), async (req, res, next) => {
      let user = req.user;
      let id = req.params.id;
      let rid = req.params.rid;
      let { name, roleId } = req.body;
      let result = await this.monitorService.UpdateRole({ user, id, rid, name, roleId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/:id/role/:rid', Auth.CheckPermission('delete:monitor'), async (req, res, next) => {
      let user = req.user;
      let id = req.params.id;
      let rid = req.params.rid;
      let result = await this.monitorService.DeleteRole({ user, id, rid });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.get('/:id/source', Auth.CheckPermission('read:monitorsource'), async (req, res, next) => {
      let user = req.user;
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

    this.router.post('/:id/source', Auth.CheckPermission('create:monitorsource'), async (req, res, next) => {
      let user = req.user;
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

    this.router.delete('/:id/source/:sid', Auth.CheckPermission('delete:monitorsource'), async (req, res, next) => {
      let user = req.user;
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

    this.router.post('/:id/testmessage', Auth.CheckPermission('send:monitortestmessage'), async (req, res, next) => {
      let user = req.user;
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