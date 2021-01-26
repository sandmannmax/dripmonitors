import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT,
  logLevel: process.env.LOGLEVEL,
  dbConnection: process.env.DB_CONNECTION,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASS,
  rabbitHost: process.env.RABBIT_HOST,
  rabbitUser: process.env.RABBIT_USER,
  rabbitPassword: process.env.RABBIT_PASS
}