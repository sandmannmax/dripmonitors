import { Credentials, S3 } from 'aws-sdk';
import { GetObjectRequest, PutObjectRequest } from 'aws-sdk/clients/s3';
import config from '../config';

export class BucketService {
  private s3: S3;

  constructor() {
    this.s3 = new S3({ 
      region: config.aws_region,
      credentials: new Credentials({ 
        accessKeyId: config.aws_accessKey!, 
        secretAccessKey: config.aws_secretAccessKey! 
      }) 
    });
  }

  async Upload({ fileName, content }: { fileName: string, content: string }): Promise<void> {
    let params: PutObjectRequest = {
      Bucket: 'lazyshoebot-monitor-scripts',
      Key: fileName,
      Body: content
    };
    await this.s3.upload(params).promise();
  }

  async Download({ fileName }: { fileName: string }): Promise<string> {
    let params: GetObjectRequest = {
      Bucket: 'lazyshoebot-monitor-scripts',
      Key: fileName
    };
    let response = await this.s3.getObject(params).promise();
    if (response.Body)
      return response.Body.toString();
    else
      throw Error('File has no Content');
  }
}