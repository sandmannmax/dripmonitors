export interface ScrapeResponseDTO {
  statusCode?: number;
  proxyError: boolean;
  content?: string;
  error?: string;
}