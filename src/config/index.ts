import { config } from 'dotenv';
config();

export default {
  base_url: process.env.VUE_APP_BASE_URL,
  api_url: 'http://localhost:3000'
}