import { Router } from 'express';
import Container from 'typedi';
import { IError } from '../types/IError';
import { AdminService } from '../services/AdminService';

export class AdminRoutes {
  private router: Router;
  private adminService: AdminService;

  constructor() {
    this.router = Router({strict: true});
    this.adminService = Container.get(AdminService);

    this.router.get('/monitorpage', async (req, res, next) => {
      let result = await this.adminService.GetMonitorpages();
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/monitorpage', async (req, res, next) => {
      let { functionName, name, cc } = req.body;
      let result = await this.adminService.CreateMonitorpage({ functionName, name, cc });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });
    
    this.router.patch('/monitorpage/:id', async (req, res, next) => {
      let id = req.params.id;
      let { functionName, name, visible, cc, isHtml, func } = req.body;
      let result = await this.adminService.UpdateMonitorpage({ id, functionName, name, visible, cc, isHtml, func });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/monitorpage/:id', async (req, res, next) => {
      let id = req.params.id;
      let result = await this.adminService.DeleteMonitorpage({ id });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.get('/monitorpage/:id/url', async (req, res, next) => {
      let monitorpageId = req.params.id;
      let result = await this.adminService.GetUrls({ monitorpageId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/monitorpage/:id/url', async (req, res, next) => {
      let monitorpageId = req.params.id;
      let { url } = req.body;
      let result = await this.adminService.CreateUrl({ monitorpageId, url });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });
    
    this.router.patch('/monitorpage/:monitorpageId/url/:id', async (req, res, next) => {
      let monitorpageId = req.params.monitorpageId;
      let id = req.params.id;
      let { url } = req.body;
      let result = await this.adminService.UpdateUrl({ id, monitorpageId, url });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/monitorpage/:monitorpageId/url/:id', async (req, res, next) => {
      let monitorpageId = req.params.monitorpageId;
      let id = req.params.id;
      let result = await this.adminService.DeleteUrl({ id, monitorpageId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/monitorpage/:id/start', async (req, res, next) => {
      let id = req.params.id;
      let { interval } = req.body;
      let result = await this.adminService.StartMonitorpage({ id, interval });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/monitorpage/:id/stop', async (req, res, next) => {
      let id = req.params.id;
      let result = await this.adminService.StopMonitorpage({ id });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.get('/proxy', async (req, res, next) => {
      let result = await this.adminService.GetProxies();
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/proxy', async (req, res, next) => {
      let { address, cc } = req.body;
      let result = await this.adminService.CreateProxy({ address, cc });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });
    
    this.router.patch('/proxy/:id', async (req, res, next) => {
      let id = req.params.id;
      let { address, cc } = req.body;
      let result = await this.adminService.UpdateProxy({ id, address, cc });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/proxy/:id', async (req, res, next) => {
      let id = req.params.id;
      let result = await this.adminService.DeleteProxy({ id });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.get('/monitorrun', async (req, res, next) => {
      let result = await this.adminService.GetMonitorruns();
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.get('/monitorpage/:monitorpageId/product', async (req, res, next) => {
      let monitorpageId = req.params.monitorpageId;
      let result = await this.adminService.GetProducts({ monitorpageId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/monitorpage/:monitorpageId/product/:id/activate', async (req, res, next) => {
      let id = req.params.id;
      let monitorpageId = req.params.monitorpageId;
      let result = await this.adminService.ActivateProductMonitoring({ id, monitorpageId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/monitorpage/:monitorpageId/product/:id/disable', async (req, res, next) => {
      let id = req.params.id;
      let monitorpageId = req.params.monitorpageId;
      let result = await this.adminService.DisableProductMonitoring({ id, monitorpageId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.get('/monitorpage/:monitorpageId/filter', async (req, res, next) => {
      let monitorpageId = req.params.monitorpageId;
      let result = await this.adminService.GetFilters({ monitorpageId });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/monitorpage/:monitorpageId/filter', async (req, res, next) => {
      let monitorpageId = req.params.monitorpageId;
      let { value } = req.body;
      let result = await this.adminService.AddFilter({ monitorpageId, value });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.delete('/monitorpage/:monitorpageId/filter/:id', async (req, res, next) => {
      let id = req.params.id;
      let monitorpageId = req.params.monitorpageId;
      let result = await this.adminService.RemoveFilter({ id, monitorpageId });
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