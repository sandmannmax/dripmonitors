import { CountryCode } from "../models/CountryCode";
import { Filter } from "../models/Filter";
import { Url } from "../models/Url";

export interface RunMonitorpageCommandDTO {
  urls: Url[];
  filters: Filter[];
  cc: CountryCode;
}

export interface IMonitorpageFunctionality {
  run(command: RunMonitorpageCommandDTO): void;
}