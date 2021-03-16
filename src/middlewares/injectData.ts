import { Request, RequestHandler, Response } from '@guilhermemj/micro-web-server';

type PlainObject = Record<string, any>;
type InjectDataConfig = PlainObject | (
  (req: Request, res: Response) => PlainObject
);

const BODY_METHODS = ['PUT', 'POST', 'PATCH'];

export default (config: InjectDataConfig): RequestHandler => (
  (req, res, next): void => {
    const reqDataKey = BODY_METHODS.includes(req.method) ? 'body' : 'query';

    const dataFields = (typeof config === 'function' ? config(req, res) : config);

    Object.entries(dataFields).forEach(([key, value]) => {
      if (typeof value === 'undefined') return;

      req[reqDataKey][key] = value;
    });

    next();
  }
);
