import { Service } from 'typedi';
import { sha3_512 } from 'js-sha3'
import { IResult } from '../types/IResult';
import { UserModel } from '../models/User';
import JWT from 'jsonwebtoken';
import config from '../config';
import { async } from 'crypto-random-string';
import { GetUser_O } from '../types/User';
import { RefreshTokenModel } from '../models/RefreshToken';
import { ActivationCodeModel } from '../models/ActivationCode';
import { ActivationCode } from '../types/ActivationCode';
import { MonitorModel } from '../models/Monitor';

@Service()
export class UserService {
  async Get({_id}: {_id: string}): Promise<IResult> {
    try {
      if (_id) {
        let user = await UserModel.FindUser({_id});
        if (user) {
          return {success: true, data: {user: GetUser_O(user)}};
        } else
          return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `UserService.Get: User not found in DB. _id: ${_id}`}};
      } else
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `UserService.Get: _id empty.`}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }    
  }

  async Activate({ activationCode, username, mail, password }: { activationCode: string, username: string, mail: string, password: string }): Promise<IResult> {
    try {
      if (!activationCode)
        return {success: false, error: {status: 404, message: '\'activationCode\' is missing'}};
        
      if (!username)
        return {success: false, error: {status: 404, message: '\'username\' is missing'}};
      
      if (!mail)
        return {success: false, error: {status: 404, message: '\'mail\' is missing'}};
        
      if (!password)
        return {success: false, error: {status: 404, message: '\'password\' is missing'}};
        
      if (!await ActivationCodeModel.CheckActivationCode({ activationCode }))
        return {success: false, error: {status: 404, message: '\'activationCode\' is invalid or already used'}};
        
      if (!await UserModel.IsUsernameUnused({username}))
        return {success: false, error: {status: 404, message: '\'username\' is already in use'}};
        
      if (!await UserModel.IsMailUnused({mail}))
        return {success: false, error: {status: 404, message: '\'mail\' is already in use'}};

      if (password.length < 10)
        return {success: false, error: {status: 404, message: '\'password\' must contain at least 10 letters'}};

      let activationCodeObject: ActivationCode = (await ActivationCodeModel.FindActivationCode({ activationCode }))[0];
      let newSalt = await async({length: 20});
      password = sha3_512(password + newSalt + config.pepper);
      let result = await UserModel.CreateUser({ username, mail, password, salt: newSalt, activationCodeId: activationCodeObject._id });
      let monitorResult = await MonitorModel.CreateMonitor({ userId: result[0]._id.toString() });
      await ActivationCodeModel.UseActivationCode({ activationCode });
      await UserModel.SetValidSession({_id: result[0]._id});
      const accessToken = this.generateToken({ _id: result[0]._id, username: result[0].username }, '1h');
      let refreshToken: string;
      do {
        refreshToken = await async({length: 24});
      } while (await RefreshTokenModel.CheckIsDuplicate({ _id: refreshToken }))
      await RefreshTokenModel.Insert({_id: refreshToken, userId: result[0]._id});
      return {success: true, data: {user: GetUser_O(result[0]), accessToken, refreshToken}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }    
  }

  async Update({_id, username, mail, password, oldPassword}: {_id: string, username: string, mail: string, password: string, oldPassword: string}): Promise<IResult> {
    try {
      if (!_id)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `UserService.Update: _id empty.`}};
      
      if (!oldPassword)
        return {success: false, error: {status: 404, message: '\'oldPassword\' missing'}};

      let user = await UserModel.FindUser({_id});
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `UserService.Update: User missing.`}};

      if (user.password != sha3_512(oldPassword + user.salt + config.pepper)) 
        return {success: false, error: {status: 401, message: '\'oldPassword\' wrong'}};

      if (!await UserModel.IsUsernameUnused({ username }))
        return {success: false, error: {status: 400, message: 'Username already in use'}};

      if (!await UserModel.IsMailUnused({ mail }))
        return {success: false, error: {status: 400, message: 'Mail already in use'}};

      if (password && password.length < 10)
        return {success: false, error: {status: 404, message: '\'password\' must contain at least 10 letters'}};

      if (username) {
        await UserModel.UpdateUsername({_id, username});
        await UserModel.SetInvalidSession({_id});
      }       

      if (mail) {
        await UserModel.UpdateMail({_id, mail});
        await UserModel.SetInvalidSession({_id});
      }       

      if (password) {
        password = sha3_512(password + user.salt + config.pepper);
        await UserModel.UpdatePassword({_id, password});
        await UserModel.SetInvalidSession({_id});
      }       

      user = await UserModel.FindUser({_id});
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `UserService.Update: User missing after change.`}};
      
      return {success: true, data: {user: GetUser_O(user)}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }    
  }

  async Delete({_id}: {_id: string}): Promise<IResult> {
    try {
      if (!_id)
        return {success: false, error: {status: 404, message: 'ID Missing'}};
        
      let user = await UserModel.FindUser({_id});

      if (!user)
        return {success: false, error: {status: 404, message: 'Can\'t find user'}};
 
      // TODO Delete Monitor, RefreshTokens and ActivationCode
      await UserModel.DeleteUser({_id});
      return {success: true, data: {message: 'Successfully Deleted'}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }    
  }

  private generateToken(data, expiration: string) {
    return JWT.sign({data}, config.jwtSecret, { expiresIn: expiration });
  }
}