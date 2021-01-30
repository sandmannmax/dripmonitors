import { Router } from 'express';
import Container from 'typedi';
import { UserService } from '../services/UserService';
import { IError } from '../types/IError';
import { IsAuth } from '../middleware/IsAuth';
import { UserJWT } from '../types/User';

export class UserRoutes {
  private router: Router;
  private userService: UserService;

  constructor() {
    this.router = Router({strict: true});
    this.userService = Container.get(UserService);

    this.router.get('/', IsAuth, async (req, res, next) => {
      const userJWT: UserJWT = req['user'];
      const result = await this.userService.Get({ _id: userJWT._id });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });

    this.router.post('/', async (req, res, next) => {
      const { activationCode, username, mail, password } = req.body;
      let result = await this.userService.Activate({ activationCode, username, mail, password });
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });

    this.router.patch('/', IsAuth, async (req, res, next) => {
      let userJWT: UserJWT = req['user'];
      let { username, mail, password, oldPassword } = req.body;
      let result = await this.userService.Update({_id: userJWT._id, username, mail, password, oldPassword});
      if (result.success)
        res.json(result.data);
      else if (result.error)
        next(result.error);
      else {
        let err: IError = {status: 500, message: 'Fehler'};
        next(err);
      }
    });

    this.router.delete('/', IsAuth, async (req, res, next) => {
      let userJWT: UserJWT = req['user'];
      let result = await this.userService.Delete({_id: userJWT._id});
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