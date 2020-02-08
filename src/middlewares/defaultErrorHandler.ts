import { Controller, Request, Response, NextFunction } from '@guilhermemj/micro-web-server';

const DEFAULT_ERROR_CODE = 'uncaughtException';

export default (defaultErrorCode?: string): Controller => (
  (error: any, req: Request, res: Response, next: NextFunction): void => {
    if (res.headersSent) {
      return next(error);
    }

    res.status(error.httpStatus ?? 500).json({
      code: error.code ?? defaultErrorCode ?? DEFAULT_ERROR_CODE,
      message: error.message ?? error,
    });
  }
);
