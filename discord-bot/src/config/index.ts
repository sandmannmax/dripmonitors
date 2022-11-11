export default {
  bot_token: process.env.DISCORD_BOT_TOKEN,
  postgresHost: process.env.POSTGRES_HOST,
  postgresPort: process.env.POSTGRES_PORT,
  postgresUser: process.env.POSTGRES_USER,
  postgresPassword: process.env.POSTGRES_PASSWORD,
  postgresDb: process.env.POSTGRES_DB,
}

export function ConfigSetup() {
  const envs = ['DISCORD_BOT_TOKEN', 'POSTGRES_HOST', 'POSTGRES_PORT', 'POSTGRES_USER', 'POSTGRES_PASSWORD', 'POSTGRES_DB']

  for (let i = 0; i < envs.length; i++) {
    if (!process.env[envs[i]]) {
      console.log(`Environment variable ${envs[i]} is missing`);
      process.exit(1);
    }
  }
}