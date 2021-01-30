import { Application } from 'express';
import expressLoader from './express';
import databaseLoader from './database';

export default async (expressApp: Application) => {
  await expressLoader(expressApp);
  databaseLoader();
}