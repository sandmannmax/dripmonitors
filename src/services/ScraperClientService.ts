import { credentials } from '@grpc/grpc-js';
import config from '../config';
import { GetRequest, GetResponse } from '../proto/scraper/v1/scraper_pb';
import { ScraperServiceClient } from '../proto/scraper/v1/scraper_grpc_pb';


export class ScraperClientService {
  private scraperServiceClient: ScraperServiceClient;

  constructor() {
    this.scraperServiceClient = new ScraperServiceClient(`${config.scraperHost}:${config.scraperPort}`, credentials.createInsecure());
  }

  public Get({ url, proxy, isHtml }: { url: string, proxy: string, isHtml: boolean }): Promise<string> {
    return new Promise<string>((resolve, reject) => {  
      let request: GetRequest = new GetRequest();
      request.setUrl(url);
      request.setProxy(proxy);
      request.setIshtml(isHtml);
  
      this.scraperServiceClient.get(request, (error, response) => {
        if (error) reject(error)
        else {
          if (response.getSuccess())
            resolve(response.getContent());
          else 
            reject(response.getError());
        } 
      });
    });
  }
}

