import express, { json, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import v1Router from './v1';
import config from '../../utils/config';
import pinoHttp from 'pino-http';
import { logger } from '../../utils/logger';
import sanitize from 'sanitize';
import { IError } from '../../core/base/IError';

export function HttpSetup() {
  const app = express();
  
  const whitelist = ['https://lazyshoebot.com', 'https://www.lazyshoebot.com']
  const corsCheck = (origin: any, callback: any) => {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }

  const corsOptions = {
    origin: config.isProduction ? corsCheck : '*',
  }


  app.use(json())
  app.use(cors(corsOptions))
  app.use(helmet())
  app.use(sanitize.middleware);
  app.use(pinoHttp({
    level: config.httpLogLevel
  }));

  app.use('/v1', v1Router);

  app.use((req: Request, res: Response, next: NextFunction) => {
    let err: IError = {message: 'Not Found', status: 404};
    next(err);
  });
  app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
    if (err.message == 'Insufficient scope')
      res.status(403).json({message: 'Insufficient scope'})
    else {
      if (err.status == undefined || (err.status && err.status >= 500))
        logger.error('Error ' + err.internalMessage);
      res.status(err.status || 500);
      if (err.status == 403 && (!err || !err.message))
        res.end();
      else
        res.json({message: err.message});
    }    
  });

  app.listen(config.port, () => {
    logger.info(`Server running on ${config.port}`)
  })
}
