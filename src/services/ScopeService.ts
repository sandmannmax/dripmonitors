import { Service } from 'typedi';
import { IResult } from '../types/IResult';
import config from '../config';
import { User } from '../types/User';
import fetch from 'node-fetch';

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

  async SetScope({ user }: { user: User }): Promise<IResult> {
    try {
      if (!user)
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `ScopeService.SetScope: User empty`}};    

      let userId = user['sub'];
      let roles = ['rol_FA3z8bec05C0JsV8'];

      console.log(userId)

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
      
      if (response.status === 204)
        return {success: true, data: { message: 'Set Scope to Beta-Tester' }};
      else {
        return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: `Error in ScopeService.SetScope: Cant set scope (response: ${JSON.stringify(await response.json())})`}};
      }
    } catch (error) {
      return {success: false, error: {status: 500, message: 'Unexpected Server Error', internalMessage: error}};
    }
  }
}