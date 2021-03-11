import { Router } from 'express';
import { MonitorRoutes } from "./MonitorRoutes";
import { AdminRoutes } from "./AdminRoutes";
import { Auth } from '../auth';
import { ProductRoutes } from './ProductRoutes';
import { MonitorpageRoutes } from './MonitorpageRoutes';
import { ScopeRoutes } from './ScopeRoutes';
import sanitize from 'sanitize';

let router = Router({strict: true});


router.use(sanitize.middleware);
router.use(Auth.CheckJWT);

let scopeRoutes = new ScopeRoutes();
router.use('/scope', scopeRoutes.GetRouter());

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