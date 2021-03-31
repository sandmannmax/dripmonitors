import { credentials } from '@grpc/grpc-js';
import config from '../../util/config';
import { GetRequest } from '../../proto/scraper/v1/scraper_pb';
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
      const request: GetRequest = new GetRequest();
      request.setUrl(req.url);
      request.setProxy(req.proxy);
      request.setIsHtml(req.isHtml);

      this.scraperServiceClient.get(request, (error, response) => {
        if (error) resolve({ success: false, error: error.message });
        else if (response.getSuccess()) {
          let content = response.getContent()
          resolve({ success: true, content });
        } else resolve({ success: false, error: response.getError() });
      });
    });
  }
}
