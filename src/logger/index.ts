import { createLogger, transports, format, transport } from 'winston';
import { Loggly } from 'winston-loggly-bulk';
import config from '../config';

const logFormat = format.printf( ({ level, message, timestamp , metadata}) => {
  let msg = `${timestamp} [${level}] : ${message} `  
  if(metadata)
	  msg += JSON.stringify(metadata)
  return msg
});

let transportArray: transport[] = [
  new transports.File({ 
    filename: './logs/lsb-monitor.log',
    level: config.logLevel || 'debug',
    format: format.combine(
      format.errors({ stack: true }),
      format.metadata(),
      format.timestamp(),
      format.json()
    )
  }),
  new Loggly({
    token: "60c96621-2e88-4efc-ac23-4f9d2148e580",
    subdomain: "lazyshoebot",
    tags: ["monitor"],
    json: true
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