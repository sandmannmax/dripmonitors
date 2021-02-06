import { config } from 'dotenv';

if (process.env.NODE_ENV === 'production')
  config();
else
  config({ path: '../.env'})

export default {
  logLevel: process.env.MONITOR_LOG_LEVEL || 'debug',
  redisHost: process.env.REDIS_HOST || 'localhost',
  redisPort: process.env.REDIS_PORT || '6379',
  aws_region: process.env.AWS_REGION || 'eu-central-1',
  aws_accessKey: process.env.AWS_ACCESS_KEY,
  aws_secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}