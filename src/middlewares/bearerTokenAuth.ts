import jsonwebtoken from 'jsonwebtoken';
import AppError from '@guilhermemj/app-error';
import { RequestHandler } from '@guilhermemj/micro-web-server';

import { ERR_UNAUTHORIZED } from '../utils/error-presets';

export default (jwtSecret?: string): RequestHandler => (
  (req, res, next): void => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.includes('Bearer ')) {
      throw new AppError("Authentication required", ERR_UNAUTHORIZED);
    }

    const authToken = authHeader.replace('Bearer ', '');

    if (!authToken) {
      throw new AppError("Authentication required", ERR_UNAUTHORIZED);
    }

    try {
      const trueSecret: string = jwtSecret ?? req.app.get('jwt-secret');
      const decodedToken = jsonwebtoken.verify(authToken, trueSecret);

      res.locals.user = decodedToken;
    } catch (error) {
      throw new AppError(error.message, ERR_UNAUTHORIZED);
    }

    next();
  }
);
