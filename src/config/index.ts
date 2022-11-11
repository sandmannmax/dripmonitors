import { config } from 'dotenv';
config();

export default {
  api_url: process.env.VUE_APP_API_URL
}