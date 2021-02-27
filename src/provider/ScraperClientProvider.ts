import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { ScraperServiceClient } from '../proto/scraper_grpc_pb';


export class ScraperClientProvider {
  private static instance: ScraperServiceClient;

  public static getInstance(): ScraperServiceClient {
    if (!ScraperClientProvider.instance) {
      ScraperClientProvider.instance = new ScraperServiceClient('scraper:50069', credentials.createInsecure());
    }
    
    return ScraperClientProvider.instance;
  }
}