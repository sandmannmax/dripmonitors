import { Service } from 'typedi';
import { IResult } from '../types/IResult';
import config from '../config';
import { User } from '../types/User';
import fetch from 'node-fetch';
import { Accesskey } from '../models/Accesskey';

@Service()
export class ScopeService {

  async GetScope({ user }: { user: User }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `ScopeService.GetScope: User empty`}};    

      let permissions = user.permissions;

      let scope = 'none';

      for (let i = 0; i < permissions.length; i++) {
        if (permissions[i].startsWith('role:')) {
          scope = permissions[i].split(':')[1];
        }
      }

      return {success: true, data: { scope }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }

  async SetScope({ user, accesskey }: { user: User, accesskey: string }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `ScopeService.SetScope: User empty`}};  
        
      if (!accesskey)
        return {success: false, error: {status: 400, message: '\'accesskey\' is missing'}};
        
      let uuid4regex = /^[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}$/i;

      if (!uuid4regex.test(accesskey))
        return {success: false, error: {status: 400, message: '\'accesskey\' is used or invalid'}};

      let accesskeyObject = await Accesskey.findByPk(accesskey);

      if (!accesskeyObject || accesskeyObject.used)
        return {success: false, error: {status: 400, message: '\'accesskey\' is used or invalid'}};

      let userId = user['sub'];
      let roles = ['rol_FA3z8bec05C0JsV8'];

      let response;
      let body = {            
        client_id: config.auth0_client_id,
        client_secret: config.auth0_client_secret,
        audience: 'https://lazyshoebot.eu.auth0.com/api/v2/',
        grant_type: 'client_credentials'
      };

      try {
        let url = `https://lazyshoebot.eu.auth0.com/oauth/token`
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(body)
        });
      } catch (error) {
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `Error in ScopeService.SetScope: Cant get accessToken from Auth0 API (${error.message} - ${error.response})`}};
      }

      let json = await response.json();
      let accessToken = json.access_token;

      try {
        let url = `https://lazyshoebot.eu.auth0.com/api/v2/users/${userId}/roles`
        response = await fetch(url, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
            authorization: `Bearer ${accessToken}`
          },
          body: '{"roles":["rol_FA3z8bec05C0JsV8"]}'
        });
      } catch (error) {
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `Error in ScopeService.SetScope: Cant set scope (error: ${JSON.stringify(error)})`}};
      }

      if (response.status !== 204) {
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `Error in ScopeService.SetScope: Cant set scope (response: ${JSON.stringify(await response.json())})`}};
      }
      
      await accesskeyObject.update({ used: true });
      return {success: true, data: { message: 'Set Scope to Beta-Tester' }};
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}