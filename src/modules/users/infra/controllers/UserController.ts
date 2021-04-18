import { Router } from 'express';
import { IUserService } from '../../application/services/UserService';
import { UserDiscordIdExtractor } from '../../../../core/logic/UserDiscordIdExtractor';

export class UserController {
  private router: Router;
  private userService: IUserService;

  constructor(
    userService: IUserService
  ) {
    this.router = Router({strict: true});
    this.userService = userService;

    this.router.get('/', async (req, res, next) => {
      const user = req['user'];
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        const checkUserDTO = await this.userService.checkUser(userDiscordId)
        res.json(checkUserDTO);
      } catch (error) {
        next(error);
      }
    });

    this.router.post('/', async (req, res, next) => {
      const user = req['user'];
      const { serverName, serverDiscordId } = req.body;
      try {
        const userDiscordId = UserDiscordIdExtractor.ExtractDiscordId(user);
        const checkUserDTO = await this.userService.createUser({ userDiscordId, serverDiscordId, serverName });
        res.status(200);
      } catch (error) {
        next(error);
      }
    });
  }

  public GetRouter(): Router {
    return this.router;
  }
}