import { Credentials, DynamoDB } from 'aws-sdk';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';
import config from '../config';

export class DatabaseProvider {
  private static instance: DatabaseProvider;
  
  private Database: DynamoDB.DocumentClient;

  private constructor() {
    if (process.env.NODE_ENV === 'production') {
      this.Database = new DynamoDB.DocumentClient({
        region: config.aws_region,
        credentials: new Credentials({ accessKeyId: config.aws_accessKey, secretAccessKey: config.aws_secretAccessKey })
      });
    } else {
      this.Database = new DynamoDB.DocumentClient({
        region: config.aws_region,
        endpoint: 'http://localhost:8000',
        credentials: new Credentials({ accessKeyId: config.aws_accessKey, secretAccessKey: config.aws_secretAccessKey })
      });
    }  
  }

  public static getInstance(): DatabaseProvider {
    if (!DatabaseProvider.instance) 
      DatabaseProvider.instance = new DatabaseProvider();

    return DatabaseProvider.instance;
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

  async GetAll(TableName: string) {
    let params: DynamoDB.DocumentClient.ScanInput = {
      TableName
    };
    return await this.Database.scan(params).promise();
  }

  async Update(tableName: string, key: Object, updateExpression: string, values: Object, conditionExpression?: string, expressenAttributeNames?: ExpressionAttributeNameMap) {
    let params: DynamoDB.DocumentClient.UpdateItemInput = {
      TableName: tableName,
      Key: key,
      UpdateExpression: updateExpression,
      ConditionExpression: conditionExpression,
      ExpressionAttributeValues: values,
      ExpressionAttributeNames: expressenAttributeNames,
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