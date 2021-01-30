import { Service } from 'typedi';
import { sha3_512 } from 'js-sha3'
import { IResult } from '../types/IResult';
import { UserModel } from '../models/User';
import JWT from 'jsonwebtoken';
import config from '../config';
import { GetUser_O } from '../types/User';
import { ActivationCodeModel } from '../models/ActivationCode';
import { async } from 'crypto-random-string';
import { RefreshTokenModel } from '../models/RefreshToken';

@Service()
export class AuthService {
  async Login({ username, password }: { username: string, password: string }): Promise<IResult> {
    try {
      if (!username)
        return {success: false, error: {status: 404, message: '\'username\' is missing'}};

      if (!password)
        return {success: false, error: {status: 404, message: '\'password\' is missing'}};

      let user = await UserModel.FindUserByUsername({ username });
      if (!user)
        return {success: false, error: {status: 401, message: '\'username\' or \'password\' wrong'}};
        
      password = sha3_512(password + user.salt + config.pepper);      
      if (user.password != password)
        return {success: false, error: {status: 401, message: '\'username\' or \'password\' wrong'}};

      await UserModel.SetValidSession({_id: user._id});

      const accessToken = this.generateToken({_id: user._id, username: user.username}, '1h');
      let refreshToken: string;
      do {
        refreshToken = await async({length: 24});
      } while (await RefreshTokenModel.CheckIsDuplicate({ _id: refreshToken }));
      await RefreshTokenModel.Insert({_id: refreshToken, userId: user._id});
      return {success: true, data: {user: GetUser_O(user), accessToken, refreshToken}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }    
  }

  async Logout({_id}: {_id: string}): Promise<IResult> {
    try {
      if (!_id)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: '_id is missing in AuthService.Logout'}};

      await UserModel.SetInvalidSession({_id});
      return {success: true, data: {message: 'Logged out successfully'}};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }    
  }

  async Refresh({refreshToken}: {refreshToken: string}): Promise<IResult> {
    try {
      if (!refreshToken)
        return {success: false, error: {status: 400, message: '\'refreshToken\' missing'}};

      let refreshTokenRegex = new RegExp("^[0-9a-fA-F]{24}$");

      if (!refreshTokenRegex.test(refreshToken))
        return {success: false, error: {status: 400, message: '\'refreshToken\' invalid'}};

      const rt = await RefreshTokenModel.Find({ _id: refreshToken });
      const now = Number((Date.now()/1000).toString().split('.')[0]);

      if (!rt)
        return {success: false, error: {status: 400, message: '\'refreshToken\' invalid'}};

      if (Number(rt.timestamp) + (60 * 60 * 24) < now)
        return {success: false, error: {status: 400, message: '\'refreshToken\' expired'}};

      const user = await UserModel.FindUser({ _id: rt.userId });

      if (!user || !user.hasValidSession)
        return {success: false, error: {status: 400, message: '\'refreshToken\' invalid'}};

      const accessToken = this.generateToken({ _id: user._id, username: user.username }, '1h');

      return {success: true, data: { accessToken }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }    
  }

  private generateToken(data, expiration: string) {
    return JWT.sign({data}, config.jwtSecret, { expiresIn: expiration });
  }
}