import jsonwebtoken from 'jsonwebtoken';

import { Controller, Request, Response, NextFunction } from '@guilhermemj/micro-web-server';
import { RequestError, UNAUTHORIZED_ERROR } from 'src/utils/request-error';

export default (jwtSecret?: string): Controller => (
  (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.includes('Bearer ')) {
      throw new RequestError(UNAUTHORIZED_ERROR);
    }

    const authToken = authHeader.replace('Bearer ', '');

    if (!authToken) {
      throw new RequestError(UNAUTHORIZED_ERROR);
    }

    try {
      const trueSecret: string = jwtSecret ?? req.app.get('jwt-secret');
      const decodedToken = jsonwebtoken.verify(authToken, trueSecret);

      res.locals.user = decodedToken;
    } catch (error) {
      throw new RequestError(UNAUTHORIZED_ERROR);
    }

    next();
  }
);
