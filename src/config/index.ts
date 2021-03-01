import { config } from 'dotenv';

config();

export default {
  logLevel: process.env.LOG_LEVEL || 'debug',
  aws_region: process.env.AWS_REGION || 'eu-central-1',
  aws_accessKey: process.env.AWS_ACCESS_KEY,
  aws_secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
}