import { Service } from 'typedi';
import DB, { IMonkManager, ICollection, FindOptions } from 'monk';
import config from '../config';

@Service()
export class DatabaseProvider {
  private Database: IMonkManager;

  constructor() {
    this.Database = DB(config.databaseConnection, {
      auth: {
        user: config.databaseUser,
        password: config.databasePassword
      },
      authSource: 'admin'
    });
  }

  async Find<T>(collectionName: string, query: Object, options?: FindOptions<any>): Promise<Array<T>> {
    const collection: ICollection = this.Database.get(collectionName);
    let result = await collection.find(query, options);
    let resultArray: Array<T> = [];
    result.forEach(item => {
      resultArray.push(item);
    });
    return resultArray;
  }

  async Update(collectionName: string, query: Object, update: Object) {
    const collection: ICollection = this.Database.get(collectionName);
    await collection.update(query, {$set: {...update}});
  }

  async Insert(collectionName: string, object: Object) {
    const collection: ICollection = this.Database.get(collectionName);
    await collection.insert(object);
  }

  async Delete(collectionName: string, query: Object) {
    const collection: ICollection = this.Database.get(collectionName);
    await collection.remove(query);
  }
}