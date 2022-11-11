import { NextFunction } from "express";
import { MonitorsourceNotFoundException } from "../../modules/monitormanagement/domain/exceptions/MonitorsourceNotFoundException";
import { InvalidWebhookUrlException } from "../../modules/monitors/domain/exceptions/InvalidWebhookUrlException";
import { IError } from "../base/IError";
import { BaseException } from "./BaseException";
import { InvalidDiscordWebhookException } from "./InvalidDiscordWebhookException";
import { InvalidUuidException } from "./InvalidUuidException";
import { InvalidUuidParametersException } from "./InvalidUuidParametersException";
import { NullOrUndefinedException } from "./NullOrUndefinedException";
import { ServerNotFoundException } from "./ServerNotFoundException";
import { UserDuplicateException } from "./UserDuplicateException";

export class ExceptionHandling {
  public static HandleException({ error, next }: { error: any, next: NextFunction }) {
    const errorTypes: { 400: (typeof BaseException)[], 404: (typeof BaseException)[] } = { 
      400: [NullOrUndefinedException, InvalidWebhookUrlException, InvalidDiscordWebhookException, ServerNotFoundException, InvalidUuidParametersException, InvalidUuidException, UserDuplicateException], 
      404: [MonitorsourceNotFoundException] 
    };

    errorTypes[400].forEach(exceptionType => {
      if (error instanceof exceptionType) {
        let err: IError = { 
          status: 400,
          message: error.message,
        }
        next(err);
      }
    });

    errorTypes[404].forEach(exceptionType => {
      if (error instanceof exceptionType) {
        let err: IError = { 
          status: 404,
          message: error.message,
        }
        next(err);
      }
    }); 
  }
} 