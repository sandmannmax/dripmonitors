import pino from 'pino';
import { name } from '../../package.json'
import config from '../config';

const pinoLogger = pino();

pinoLogger.level = pinoLogger.levels.values[config.logLevel];

export const logger = pinoLogger.child({'service': name});