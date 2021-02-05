import jwtAuthz from 'express-jwt-authz';

export const checkPermission = (permission: string) =>  jwtAuthz([permission], { failWithError: true, customScopeKey: 'permissions' });