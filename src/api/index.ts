import { Router } from 'express';
import sanitize from 'sanitize';

let router = Router({strict: true});

router.use(sanitize.middleware);

export default () => {
  return router;
}