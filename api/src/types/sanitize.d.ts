declare module 'sanitize' {
  import { Request, Response, NextFunction } from 'express';
  
  namespace sanitize {
    function middleware(req: Request, res: Response, next: NextFunction): void;
  }
  export = sanitize;
}