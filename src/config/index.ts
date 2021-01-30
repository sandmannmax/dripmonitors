import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT,
  databaseConnection: process.env.DB_CONNECTION,
  databaseUser: process.env.MONGO_INITDB_ROOT_USERNAME,
  databasePassword: process.env.MONGO_INITDB_ROOT_PASSWORD,
  jwtSecret: process.env.TOKEN_SECRET,
  pepper: process.env.PEPPER
}