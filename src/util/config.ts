export default {
  port: process.env.MONITOR_PORT!,
  logLevel: process.env.MONITOR_LOG_LEVEL!,
  scraperHost: process.env.MONITOR_SCRAPER_HOST,
  scraperPort: process.env.MONITOR_SCRAPER_PORT,
  redisHost: process.env.REDIS_HOST!,
  redisPort: Number.parseInt(process.env.REDIS_PORT!),
  aws_region: process.env.AWS_REGION!,
  aws_accessKey: process.env.AWS_ACCESS_KEY!,
  aws_secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
};

export function ConfigSetup() {
  const envs = [
    'MONITOR_PORT',
    'MONITOR_LOG_LEVEL',
    'MONITOR_SCRAPER_HOST',
    'MONITOR_SCRAPER_PORT',
    'REDIS_HOST',
    'REDIS_PORT',
    'AWS_REGION',
    'AWS_ACCESS_KEY',
    'AWS_SECRET_ACCESS_KEY',
  ];

  for (let i = 0; i < envs.length; i++) {
    if (!process.env[envs[i]]) {
      console.log(`Environment variable ${envs[i]} is missing`);
      process.exit(1);
    }
  }
}
