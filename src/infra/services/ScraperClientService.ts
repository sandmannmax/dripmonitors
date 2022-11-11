import { credentials } from '@grpc/grpc-js';
import config from '../../util/config';
import { ScrapeRequest } from '../../proto/scraper/v1/scraper_pb';
import { ScraperServiceClient } from '../../proto/scraper/v1/scraper_grpc_pb';
import { IScraperService } from '../../application/interface/IScraperService';
import { ScrapeRequestDTO } from '../../application/dto/ScrapeRequestDTO';
import { ScrapeResponseDTO } from '../../application/dto/ScrapeResponseDTO';

export class ScraperClientService implements IScraperService {
  private scraperServiceClient: ScraperServiceClient;

  constructor() {
    this.scraperServiceClient = new ScraperServiceClient(`${config.scraperHost}:${config.scraperPort}`, credentials.createInsecure());
  }

  public async scrape(req: ScrapeRequestDTO): Promise<ScrapeResponseDTO> {
    return new Promise<ScrapeResponseDTO>((resolve, reject) => {
      const request: ScrapeRequest = new ScrapeRequest();
      request.setUrl(req.url);
      request.setCc(req.cc);
      request.setJsRendering(req.jsRendering);

      this.scraperServiceClient.scrape(request, (error, response) => {
        if (error) {
          resolve({ proxyError: false, error: error.message });
        } else {
          resolve({ statusCode: response.getStatusCode(), proxyError: response.getProxyError(), content: response.getContent(), error: response.getError()});
        }
      });
    });
  }
}
