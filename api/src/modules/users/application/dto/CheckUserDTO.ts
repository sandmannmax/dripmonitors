import { ServerDTO } from "./ServerDTO";

export interface CheckUserDTO {
  isUser: boolean;
  servers?: ServerDTO[];  
}