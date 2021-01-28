import { Router } from 'express';
import sanitize from 'sanitize';
import { AuthRoutes } from './AuthRoutes';
import { MonitorRoutes } from './MonitorRoutes';
import { ProxyRoutes } from './ProxyRoutes';
import { Queue } from 'bull';

export default (queue: Queue) => {
  const router = Router({strict: true});

  router.use(sanitize.middleware);

  let authRoutes = new AuthRoutes();
  router.use('/auth', authRoutes.GetRouter());

  let monitorRoutes = new MonitorRoutes(queue);
  router.use('/monitor', monitorRoutes.GetRouter());

  let proxyRoutes = new ProxyRoutes();
  router.use('/proxy', proxyRoutes.GetRouter());

  return router;
}