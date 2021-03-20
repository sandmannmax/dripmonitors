import { Credentials, Lambda } from 'aws-sdk';
import config from '../config';

export class LambdaService {
  private lambda: Lambda;

  constructor() {
    this.lambda = new Lambda({ 
      region: config.aws_region,
      credentials: new Credentials({ 
        accessKeyId: config.aws_accessKey!, 
        secretAccessKey: config.aws_secretAccessKey! 
      }) 
    });
  }

  async Run({ functionName, payload }: { functionName: string, payload: any }) {
    return await this.lambda.invoke({
      FunctionName: functionName,
      Payload: JSON.stringify(payload)
    }).promise();
  }
}