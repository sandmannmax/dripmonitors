import { AWSError, DynamoDB } from 'aws-sdk';
import { ExpressionAttributeNameMap } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';

export interface IDatabaseProvider {
  Get(tableName: string, key: Object): Promise<PromiseResult<DynamoDB.DocumentClient.GetItemOutput, AWSError>>;

  Find(TableName: string, KeyConditionExpression: string, ExpressionAttributeValues: Object, IndexName?: string): Promise<PromiseResult<DynamoDB.DocumentClient.QueryOutput, AWSError>>;

  Scan(TableName: string, FilterExpression: string, ExpressionAttributeValues: Object, ExpressionAttributeNames?: ExpressionAttributeNameMap, IndexName?: string): Promise<PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWSError>>;

  GetAll(TableName: string): Promise<PromiseResult<DynamoDB.DocumentClient.ScanOutput, AWSError>>;

  Update(tableName: string, key: Object, updateExpression: string, values: Object, conditionExpression?: string, expressenAttributeNames?: ExpressionAttributeNameMap): Promise<PromiseResult<DynamoDB.DocumentClient.UpdateItemOutput, AWSError>>;

  Insert(tableName: string, item: Object): Promise<void>;

  Delete(tableName: string, key: Object): Promise<PromiseResult<DynamoDB.DocumentClient.DeleteItemOutput, AWSError>>;
}