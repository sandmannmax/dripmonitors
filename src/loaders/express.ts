import { Application, json, Request, NextFunction, Response } from 'express';
import cors from 'cors';
import { IError } from '../types/IError';
import api from '../api';
import { logger } from '../logger';

export default async (app: Application) => {

  app.get('/status', (req, res) => { res.status(200).end(); });
  app.head('/status', (req, res) => { res.status(200).end(); });

  app.use(json());
  app.use(cors());
  app.use('/', api());

  app.use((req: Request, res: Response, next: NextFunction) => {
    let err: IError = {message: 'Not Found', status: 404};
    next(err);
  });
  app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
    if (err.message == 'Insufficient scope')
      res.status(403).json({message: 'Insufficient scope'})
    else {
      if (err.status == undefined || (err.status && err.status >= 500))
        logger.error('Error', err);
      res.status(err.status || 500);
      if (err.status == 403 && (!err || !err.message))
        res.end();
      else
        res.json({message: err.message});
    }    
  });

  logger.info('Express initialized')
}