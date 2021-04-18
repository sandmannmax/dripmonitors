import express, { json } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { v1Router } from './v1';
import config from '../../config';
import pinoHttp from 'pino-http';

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
  app.use(pinoHttp({
    level: config.httpLogLevel
  }));

  app.use('/v1', v1Router)

  app.listen(config.port, () => {
    console.log(`Server running on ${config.port}`)
  })
}
