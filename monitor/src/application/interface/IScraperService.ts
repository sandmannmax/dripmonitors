import { ScrapeRequestDTO } from '../dto/ScrapeRequestDTO';
import { ScrapeResponseDTO } from '../dto/ScrapeResponseDTO';

export interface IScraperService {
  scrape(req: ScrapeRequestDTO): Promise<ScrapeResponseDTO>;
}