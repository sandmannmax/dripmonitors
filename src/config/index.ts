import { config } from 'dotenv';

if (process.env.NODE_ENV === 'production')
  config();
else
  config({ path: '../.env'})

export default {
  port: process.env.API_PORT || 3000,
  logLevel: process.env.API_LOG_LEVEL || 'debug',
  httpLogLevel: process.env.API_HTTP_LOG_LEVEL || 'error',
  auth0_tenant: process.env.API_AUTH0_TENANT || 'https://lazyshoebot.eu.auth0.com/',
  auth0_audience: process.env.API_AUTH0_AUDIENCE || 'https://api.lazyshoebot.com',
  aws_region: process.env.API_AWS_REGION || 'eu-central-1',
  aws_accessKey: process.env.API_AWS_ACCESS_KEY,
  aws_secretAccessKey: process.env.API_AWS_SECRET_ACCESS_KEY
}