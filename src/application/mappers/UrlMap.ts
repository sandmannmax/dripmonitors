import { Url } from "../../domain/models/Url";
import { UrlDTO } from "../dto/UrlDTO";

export class UrlMap {
  public static toDTO(url: Url): UrlDTO {
    return {
      value: url.value
    };
  }
}
