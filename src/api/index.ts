import { UserRoutes } from './UserRoutes';
import { AuthRoutes } from './AuthRoutes';
import { Router } from 'express';
import { MonitorRoutes } from "./MonitorRoutes";
import sanitize from 'sanitize';

let router = Router({strict: true});

router.use(sanitize.middleware);

let userRoutes = new UserRoutes();
router.use('/user', userRoutes.GetRouter());

let authRoutes = new AuthRoutes();
router.use('/auth', authRoutes.GetRouter());

let monitorRoutes = new MonitorRoutes();
router.use('/monitor', monitorRoutes.GetRouter());

export default () => {
  return router;
}