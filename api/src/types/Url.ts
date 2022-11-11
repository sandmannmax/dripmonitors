import { Url } from "../models/Url";

export class Url_O {
  public id!: string;
  public url!: string;
}

export function GetUrl_O(url: Url): Url_O {
  let urlelement_O: Url_O = new Url_O();
  urlelement_O.id = url.id;
  urlelement_O.url = url.url;
  return urlelement_O;
}

export function GetUrls_O(urls: Array<Url>): Array<Url_O> {
  let urls_O = new Array<Url_O>();
  for (let i = 0; i < urls.length; i++) {
    urls_O.push(GetUrl_O(urls[i]));
  }
  return urls_O;
}