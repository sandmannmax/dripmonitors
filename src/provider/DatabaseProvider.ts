import { Service } from 'typedi';
import { DynamoDB } from 'aws-sdk';

@Service()
export class DatabaseProvider {
  private Database: DynamoDB.DocumentClient;

  constructor() {
    this.Database = new DynamoDB.DocumentClient({
      region: "eu-central-1",
      endpoint: "http://localhost:8000"
    });
  }

  async Get(tableName: string, key: Object) {
    let params: DynamoDB.DocumentClient.GetItemInput = {
      TableName: tableName,
      Key: key
    };
    return await this.Database.get(params).promise();
  }

  async Find(TableName: string, KeyConditionExpression: string, ExpressionAttributeValues: Object, IndexName?: string) {
    let params: DynamoDB.DocumentClient.QueryInput = {
      TableName,
      IndexName,
      KeyConditionExpression,
      ExpressionAttributeValues
    };
    return await this.Database.query(params).promise();
  }

  async Update(tableName: string, key: Object, updateExpression: string, values: Object, conditionExpression?: string) {
    let params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ConditionExpression: conditionExpression,
      ExpressionAttributeValues: values,
      ReturnValues: "UPDATED_NEW"
    };
    return await this.Database.update(params).promise();
  }

  async Insert(tableName: string, item: Object) {
    let params = {
      TableName: tableName,
      Item: item
    };
    await this.Database.put(params).promise();
  }

  async Delete(tableName: string, key: Object) {
    let params = {
      TableName: tableName,
      Key: key
    };
    return await this.Database.delete(params).promise();
  }
}