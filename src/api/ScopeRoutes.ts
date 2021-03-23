import { Router } from 'express';
import Container from 'typedi';
import { Auth } from '../auth';
import { IError } from '../types/IError';
import { ScopeService } from '../services/ScopeService';

export class ScopeRoutes {
  private router: Router;
  private scopeService: ScopeService;

  constructor() {
    this.router = Router({strict: true});
    this.scopeService = Container.get(ScopeService);

    this.router.get('/', async (req, res, next) => {
      let user = req['user'];
      let result = await this.scopeService.GetScope({ user });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Unexpected Error'};
        next(err);
      }
    });

    this.router.post('/', async (req, res, next) => {
      let user = req['user'];
      let { accesskey } = req.body;
      let result = await this.scopeService.SetScope({ user, accesskey });
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