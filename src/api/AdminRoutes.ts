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
      let { techname, name, cc } = req.body;
      let result = await this.adminService.CreateMonitorpage({ techname, name, cc });
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
      let { techname, name, visible, cc, isHtml, func } = req.body;
      let result = await this.adminService.UpdateMonitorpage({ id, techname, name, visible, cc, isHtml, func });
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

    this.router.post('/monitorpage/:id/test', async (req, res, next) => {
      let id = req.params.id;
      let { func, reloadContent } = req.body;
      let result = await this.adminService.TestMonitorpage({ id, func, reloadContent });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    // this.router.get('/monitorpageconfig', async (req, res, next) => {
    //   let result = await this.adminService.GetMonitorpageconfigs();
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });

    // this.router.post('/monitorpageconfig', async (req, res, next) => {
    //   let result = await this.adminService.CreateMonitorpageconfig();
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });
    
    // this.router.patch('/monitorpageconfig/:id', async (req, res, next) => {
    //   let id = req.params.id;
    //   let { isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts } = req.body;
    //   let result = await this.adminService.UpdateMonitorpageconfig({ id, isHtml, allSizesAvailable, soldOutCheckSizes, hasParentProducts, hasChildProducts });
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });

    // this.router.delete('/monitorpageconfig/:id', async (req, res, next) => {
    //   let id = req.params.id;
    //   let result = await this.adminService.DeleteMonitorpageconfig({ id });
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });
    
    // this.router.patch('/monitorpageconfig/:monitorpageconfigId/processconfig/:id', async (req, res, next) => {
    //   let monitorpageconfigId = req.params.monitorpageconfigId;
    //   let id = req.params.id;
    //   let { constant, hasConstant } = req.body;
    //   let result = await this.adminService.UpdateProcessconfig({ id, monitorpageconfigId, constant, hasConstant });
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });

    // this.router.post('/monitorpageconfig/:monitorpageconfigId/processconfig/:processconfigId/pipe', async (req, res, next) => {
    //   let monitorpageconfigId = req.params.monitorpageconfigId
    //   let processconfigId = req.params.processconfigId;
    //   let result = await this.adminService.CreatePipeelement({ monitorpageconfigId, processconfigId });
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });
    
    // this.router.patch('/monitorpageconfig/:monitorpageconfigId/processconfig/:processconfigId/pipe/:id', async (req, res, next) => {
    //   let monitorpageconfigId = req.params.monitorpageconfigId;
    //   let processconfigId = req.params.processconfigId;
    //   let id = req.params.id;
    //   let { command, order } = req.body;
    //   let result = await this.adminService.UpdatePipeelement({ id, monitorpageconfigId, processconfigId, command, order });
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });

    // this.router.delete('/monitorpageconfig/:monitorpageconfigId/processconfig/:processconfigId/pipe/:id', async (req, res, next) => {
    //   let monitorpageconfigId = req.params.monitorpageconfigId;
    //   let processconfigId = req.params.processconfigId;
    //   let id = req.params.id;
    //   let result = await this.adminService.DeletePipeelement({ id, monitorpageconfigId, processconfigId });
    //   if (result.success)
    //     res.json(result.data);
    //   else if (result.error)
    //     next(result.error);
    //   else {
    //     let err: IError = {status: 500, message: 'Unexpected Error'};
    //     next(err);
    //   }
    // });

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
      let { address } = req.body;
      let result = await this.adminService.CreateProxy({ address });
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
      let { address } = req.body;
      let result = await this.adminService.UpdateProxy({ id, address });
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
  }

  public GetRouter(): Router {
    return this.router;
  }
}