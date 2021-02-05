import jwt from 'express-jwt';
import jwks from 'jwks-rsa';

export const checkJWT = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://lazyshoebot.eu.auth0.com/.well-known/jwks.json'
  }),
  audience: 'https://api.lazyshoebot.com',
  issuer: 'https://lazyshoebot.eu.auth0.com/',
  algorithms: ['RS256']
});