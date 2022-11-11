import { UrlDTO } from "../../application/dto/UrlDTO";
import { Url } from "../../proto/monitor/v1/monitor_pb";

export class UrlDTOToGrpcFilter {
  public static Map(url: UrlDTO): Url {
    let mappedUrl: Url = new Url();
    mappedUrl.setValue(url.value);
    return mappedUrl;
  }

  public static MultiMap(urls: UrlDTO[]): Url[] {
    let mappedUrls: Url[] = [];
    for (let i = 0; i < urls.length; i++) {
      mappedUrls.push(UrlDTOToGrpcFilter.Map(urls[i]));
    }
    return mappedUrls;
  }
}
