import { createLogger, Logger, transports, format } from 'winston';

export class Log {
  public logger: Logger;

  constructor(name) {
    this.logger = createLogger({
      level: 'debug',
      defaultMeta: { service: name },
      transports: [
        new transports.File({ 
          filename: './logs/' + name + '.log',
          format: format.combine(
            format.errors({ stack: true }),
            format.metadata(),
            format.timestamp(),
            format.json()
          )
        }),
        new transports.Console({
          format: format.simple(),
        })
      ]
    });
  }

  debug(log, metadata) {
    this.logger.debug(log, metadata);
  }

  info(log, metadata) {
    this.logger.info(log, metadata);
  }

  warn(log, metadata) {
    this.logger.warn(log, metadata);
  }

  error(log, metadata) {
    this.logger.error(log, metadata);
  }

  log(level, log, metadata) {
      const metadataObject = {metadata: undefined}
      if (metadata) metadataObject.metadata = metadata

      this.logger[level](log, metadataObject)
  }
}

export function getLogger() {
  return new Log('lazyshoebot');
}