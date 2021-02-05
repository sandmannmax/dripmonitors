import { createLogger, transports, format, transport } from 'winston';
import config from '../config';

const logFormat = format.printf( ({ level, message, timestamp , metadata}) => {
  let msg = `${timestamp} [${level}] : ${message} `  
  if(metadata)
	  msg += JSON.stringify(metadata)
  return msg
});

let transportArray: transport[] = [
  new transports.File({ 
    filename: './logs/logs.log',
    level: config.logLevel || 'debug',
    format: format.combine(
      format.errors({ stack: true }),
      format.metadata(),
      format.timestamp(),
      format.json()
    )
  })  
];

if (process.env.NODE_ENV !== 'production') {
  transportArray.push(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.splat(),
        format.timestamp(),
        logFormat
      ),
      level: 'info'
    })
  );
}

export const logger = createLogger({
  transports: transportArray
});

export const httpLogger = createLogger({
  level: config.httpLogLevel,
  transports: [
    new transports.File({ 
      filename: './logs/http.log',
      format: format.simple()
    })
  ]
});