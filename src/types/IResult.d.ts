import { IError } from "./IError";

export interface IResult {
  success: boolean,
  data?: any,
  error?: IError,
}