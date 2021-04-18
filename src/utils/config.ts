export default {
  environment: process.env.NODE_ENV,
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  port: Number.parseInt(process.env.API_PORT!),
  logLevel: process.env.API_LOG_LEVEL,
  httpLogLevel: process.env.API_HTTP_LOG_LEVEL,
  auth0_tenant: process.env.API_AUTH0_TENANT,
  auth0_audience: process.env.API_AUTH0_AUDIENCE,
  auth0_client_id: process.env.API_AUTH0_CLIENT_ID,
  auth0_client_secret: process.env.API_AUTH0_CLIENT_SECRET,
  aws_region: process.env.AWS_REGION,
  aws_accessKey: process.env.AWS_ACCESS_KEY,
  aws_secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  monitorHost: process.env.API_MONITOR_HOST,
  monitorPort: process.env.API_MONITOR_PORT,
  scraperHost: process.env.API_SCRAPER_HOST,
  scraperPort: process.env.API_SCRAPER_PORT,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDb: process.env.POSTGRES_DB,
}

export function ConfigSetup() {
  const envs = ['NODE_ENV', 'API_PORT', 'API_LOG_LEVEL', 'API_HTTP_LOG_LEVEL', 'API_AUTH0_TENANT', 'API_AUTH0_AUDIENCE', 'API_AUTH0_CLIENT_ID', 'API_AUTH0_CLIENT_SECRET', 'AWS_REGION', 'AWS_ACCESS_KEY', 'AWS_SECRET_ACCESS_KEY', 'REDIS_HOST', 'REDIS_PORT', 'API_MONITOR_HOST', 'API_MONITOR_PORT', 'API_SCRAPER_HOST', 'API_SCRAPER_PORT', 'POSTGRES_HOST', 'POSTGRES_PORT', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB']

  for (let i = 0; i < envs.length; i++) {
    if (!process.env[envs[i]]) {
      console.log(`Environment variable ${envs[i]} is missing`);
      process.exit(1);
    }
  }
}