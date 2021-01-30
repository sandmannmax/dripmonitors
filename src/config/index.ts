import { config } from 'dotenv';
config();

export default {
  base_url: process.env.VUE_APP_BASE_URL,
  api_url: process.env.VUE_APP_API_URL
}