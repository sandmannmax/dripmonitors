import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import config from '../utils/config';
import jwtAuthz from 'express-jwt-authz';

export class Auth {

  public static CheckJWT = jwt({
    secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: config.auth0_tenant + '.well-known/jwks.json'
    }),
    audience: config.auth0_audience,
    issuer: config.auth0_tenant,
    algorithms: ['RS256']
  });

  public static CheckPermission = (permission: string) => jwtAuthz([permission], { failWithError: true, customScopeKey: 'permissions' });
}