import { IncomingHttpHeaders } from 'http';
import { Request, RequestHandler, Response } from '@guilhermemj/micro-web-server';

type InjectHeadersConfig = IncomingHttpHeaders | (
  (req: Request, res: Response) => IncomingHttpHeaders
);

export default (config: InjectHeadersConfig): RequestHandler => (
  (req, res, next): void => {
    const headers = (typeof config === 'function' ? config(req, res) : config);

    Object.entries(headers).forEach(([key, value]) => {
      if (typeof value === 'undefined') return;

      req.headers[key] = value;
    });

    next();
  }
);
