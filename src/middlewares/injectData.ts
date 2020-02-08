import { Controller, Request, Response, NextFunction } from '@guilhermemj/micro-web-server';

type PlainObject<T = any> = { [key: string]: T };
type InjectDataConfig = PlainObject | ((req: Request, res: Response) => PlainObject);

const BODY_METHODS = ['PUT', 'POST', 'PATCH'];

export default (config: InjectDataConfig): Controller => (
  (req: Request, res: Response, next: NextFunction): void => {
    const reqDataKey = BODY_METHODS.includes(req.method) ? 'body' : 'query';

    const dataFields = (typeof config === 'function' ? config(req, res) : config);

    Object.entries(dataFields).forEach(([key, value]) => {
      if (typeof value === 'undefined') return;

      req[reqDataKey][key] = value;
    });

    next();
  }
);
