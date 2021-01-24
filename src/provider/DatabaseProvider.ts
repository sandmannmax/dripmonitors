import DB, { IMonkManager, ICollection, FindOptions } from 'monk';

export class DatabaseProvider {
  private Database: IMonkManager;

  constructor(connection, username, password) {
    this.Database = DB(connection, {
      auth: {
        user: username,
        password: password
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