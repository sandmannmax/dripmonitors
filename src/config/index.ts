import { config } from 'dotenv';
config();

export default {
  dbConnection: process.env.DB_CONNECTION,
  dbUser: process.env.MONGO_INITDB_ROOT_USERNAME,
  dbPassword: process.env.MONGO_INITDB_ROOT_PASSWORD
}