import { Inject } from 'typedi';
import { DatabaseProvider } from '../provider/DatabaseProvider';

export default () => {
  const dbProvider = new DatabaseProvider();
  Inject(DatabaseProvider => () => dbProvider);
}