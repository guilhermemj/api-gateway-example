import { ErrorRequestHandler } from '@guilhermemj/micro-web-server';

export default (defaultErrorCode = 'ERR_UNCAUGHT_EXCEPTION'): ErrorRequestHandler => (
  (error, req, res, next): void => {
    if (res.headersSent) {
      return next(error);
    }

    res.status(error.httpStatus ?? 500).json({
      code: error.code ?? defaultErrorCode,
      message: error.message ?? error,
    });
  }
);
