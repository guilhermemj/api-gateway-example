import { IncomingHttpHeaders } from 'http';
import { Controller, Request, Response, NextFunction } from '@guilhermemj/micro-web-server';

type InjectHeadersConfig = IncomingHttpHeaders | ((req: Request, res: Response) => IncomingHttpHeaders);

export default (config: InjectHeadersConfig): Controller => (
  (req: Request, res: Response, next: NextFunction): void => {
    const headers = (typeof config === 'function' ? config(req, res) : config);

    Object.entries(headers).forEach(([key, value]) => {
      if (typeof value === 'undefined') return;

      req.headers[key] = value;
    });

    next();
  }
);
