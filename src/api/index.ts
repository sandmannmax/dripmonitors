import { Router } from 'express';
import { MonitorRoutes } from "./MonitorRoutes";
import { AdminRoutes } from "./AdminRoutes";
import sanitize from 'sanitize';
import { checkJWT } from '../auth';
import { ProductRoutes } from './ProductRoutes';
import { MonitorpageRoutes } from './MonitorpageRoutes';
import { checkPermission } from '../auth/checkPermission';

let router = Router({strict: true});

router.use(sanitize.middleware);
router.use(checkJWT);

let monitorRoutes = new MonitorRoutes();
router.use('/monitor', monitorRoutes.GetRouter());

let monitorpageRoutes = new MonitorpageRoutes();
router.use('/monitorpage', monitorpageRoutes.GetRouter());

let productRoutes = new ProductRoutes();
router.use('/product', productRoutes.GetRouter());

let adminRoutes = new AdminRoutes();
router.use('/admin', checkPermission('role:admin'), adminRoutes.GetRouter());

export default () => {
  return router;
}