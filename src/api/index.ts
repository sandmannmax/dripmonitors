import { Router } from 'express';
import { MonitorRoutes } from "./MonitorRoutes";
import { AdminRoutes } from "./AdminRoutes";
import sanitize from 'sanitize';
import { Auth } from '../auth';
import { ProductRoutes } from './ProductRoutes';
import { MonitorpageRoutes } from './MonitorpageRoutes';

let router = Router({strict: true});

router.use(sanitize.middleware);
router.use(Auth.CheckJWT);

let monitorRoutes = new MonitorRoutes();
router.use('/monitor', monitorRoutes.GetRouter());

let monitorpageRoutes = new MonitorpageRoutes();
router.use('/monitorpage', monitorpageRoutes.GetRouter());

let productRoutes = new ProductRoutes();
router.use('/product', productRoutes.GetRouter());

let adminRoutes = new AdminRoutes();
router.use('/admin', Auth.CheckPermission('role:admin'), adminRoutes.GetRouter());

export default () => {
  return router;
}