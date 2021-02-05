import { createLogger, transports, format } from 'winston';
import config from '../config';


const logFormat = format.printf( ({ level, message, timestamp , metadata}) => {
  let msg = `${timestamp} [${level}] : ${message} `  
  if(metadata)
	  msg += JSON.stringify(metadata)
  return msg
});

export const logger = createLogger({
  transports: [
    new transports.File({ 
      filename: './logs/lazyshoebot.log',
      level: config.logLevel || 'debug',
      format: format.combine(
        format.errors({ stack: true }),
        format.metadata(),
        format.timestamp(),
        format.json()
      )
    }),
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        logFormat
      ),
      level: 'info'
    })
  ]
});