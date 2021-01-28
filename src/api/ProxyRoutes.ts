import { Router } from 'express';
import { IError } from '../types/IError';
import { IsAuth } from '../middleware/IsAuth';
import { ProxyService } from '../services/ProxyService';

export class ProxyRoutes {
  private router: Router;
  private proxyService: ProxyService;

  constructor() {
    this.router = Router({strict: true});
    this.proxyService = new ProxyService();

    this.router.get('/', IsAuth, async (req, res, next) => {
      let result = await this.proxyService.GetProxies();
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });
    
    this.router.post('/', IsAuth, async (req, res, next) => {
      let { address, port } = req.body;
      let result = await this.proxyService.CreateProxy({ address, port });
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