import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT_MONITOR,
  logLevel: process.env.LOGLEVEL_MONITOR,
  jwtSecret: process.env.TOKEN_SECRET_MONITOR,
  pepper: process.env.PEPPER_MONITOR,
  dbConnection: process.env.DB_CONNECTION,
  dbUser: process.env.MONGO_INITDB_ROOT_USERNAME,
  dbPassword: process.env.MONGO_INITDB_ROOT_PASSWORD
}