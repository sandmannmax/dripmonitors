import { Service } from 'typedi';
import Container from 'typedi';
import { MonitorModel } from '../models/Monitor';
import { IResult } from '../types/IResult';
import { GetMonitor_O, Monitor } from '../types/Monitor';
import { DiscordService } from './DiscordService';
import { UserJWT } from '../types/User';
import JWT from 'jsonwebtoken';
import { ActivationCodeModel } from '../models/ActivationCode';
import config from '../config';
import { async } from 'crypto-random-string';

@Service()
export class MonitorService {
  private discordService: DiscordService;

  constructor() {
    this.discordService = Container.get(DiscordService);
  }

  async GetMonitor({ user }: { user: UserJWT }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: User empty`}};    

      let result = await MonitorModel.GetMonitor({ userId: user._id });
      let monitor: Monitor;
      if (result.length == 0){
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};      
      } else if (result.length == 1) {
        monitor = result[0];
      } else {
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.GetMonitor: Found more than one monitor for userId = ${user._id}`}};
      }
      return {success: true, data: {monitor: GetMonitor_O(monitor)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async UpdateMonitor({ user, webHook, name, imageUrl }: { user: UserJWT, webHook: string, name: string, imageUrl: string }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.UpdateMonitor: User empty`}};  

      let result = await MonitorModel.GetMonitor({ userId: user._id });

      if (result.length == 0)
        return {success: false, error: {status: 404, message: 'Object is not existing.'}};
      
      if (result.length > 1)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.UpdateMonitor: Found more than one monitor for userId = ${user._id}`}};
      
      let monitor = result[0];

      if (webHook)
        monitor = await MonitorModel.UpdateWebhook({ userId: user._id, webHook });

      if (name != undefined)
        await MonitorModel.UpdateBotName({ userId: user._id, botName: name });

      if (imageUrl != undefined)
        await MonitorModel.UpdateBotImage({ userId: user._id, botImage: imageUrl });

      result = await MonitorModel.GetMonitor({ userId: user._id });
      if (result.length != 1)
        return {success: false, error: {status: 500, message: 'Object is not existing.', internalMessage: `MonitorService.UpdateMonitor: Error after Updating`}};        
      monitor = result[0];
      
      return {success: true, data: {monitor: GetMonitor_O(monitor)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async SendTestMessage({ user }: { user: UserJWT }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.SendTestMessage: User empty`}};

      let result = await MonitorModel.GetMonitor({ userId : user._id });

      if (result.length == 0)
        return {success: false, error: {status: 404, message: 'Monitor is not existing.'}};
      
      if (result.length > 1)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `MonitorService.SendTestMessage: Found more than one monitor for userId = ${user._id}`}};
      
      let monitor = result[0];

      if (!monitor.webHook)
        return {success: false, error: {status: 404, message: 'Monitor Webhook is not configured.'}};
        
      return this.discordService.SendTestMessage({webHook: monitor.webHook, botName: monitor.botName, botImage: monitor.botImage});
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async RequestBetaAccess({ mail }: { mail: string }): Promise<IResult> {
    try {
      if (!mail)
        return {success: false, error: {status: 404, message: '\'mail\' is missing'}}; 

      let result = await ActivationCodeModel.FindActivationCodeByMail({ mail });
      if (result.length != 0)
        return {success: false, error: {status: 404, message: 'E-Mail already requested Beta-Testing-Access'}};

      let activationCode;
      do {
        activationCode = await async({length: 24});
      } while (await ActivationCodeModel.CheckIsDuplicate({ code: activationCode }))
      await ActivationCodeModel.CreateActivationCode({ activationCode, mail });
      
      return {success: true, data: { message: 'Request sent successfully' }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}

function generateToken(data, expiration: string) {
  return JWT.sign({data}, config.jwtSecret, { expiresIn: expiration });
}