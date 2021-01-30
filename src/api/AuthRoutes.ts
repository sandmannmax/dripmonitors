import { Router } from 'express';
import Container from 'typedi';
import { AuthService } from '../services/AuthService';
import { IError } from '../types/IError';
import { IsAuth } from '../middleware/IsAuth';
import { UserJWT } from '../types/User';

export class AuthRoutes {
  private router: Router;
  private authService: AuthService;

  constructor() {
    this.router = Router({strict: true});
    this.authService = Container.get(AuthService);

    this.router.post('/login', async (req, res, next) => {
      const { username, password } = req.body;
      let result = await this.authService.Login({username, password});
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });

    this.router.post('/logout', IsAuth, async (req, res, next) => {
      let userJWT: UserJWT = req['user'];
      let result = await this.authService.Logout({_id: userJWT._id});
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });

    this.router.post('/refresh', async (req, res, next) => {
      const { refreshToken } = req.body;
      let result = await this.authService.Refresh({refreshToken});
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