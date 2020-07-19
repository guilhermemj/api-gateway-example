import Axios, { AxiosRequestConfig } from 'axios';
import { Controller, Request, Response, NextFunction, HttpMethod } from '@guilhermemj/micro-web-server';

type ProxyOptions = AxiosRequestConfig | {
  (req: Request): AxiosRequestConfig;
};

export default (baseUrl: string, options: ProxyOptions = {}): Controller => (
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const targetUrl = req.url.split('?')[0];

      const relevantHeaders = { ...req.headers };
      delete relevantHeaders.host;

      const defaultOptions: AxiosRequestConfig = {
        baseURL: baseUrl,
        url: targetUrl,
        method: req.method as HttpMethod,
        headers: relevantHeaders,
        params: req.query,
        data: req.body,
      };

      const userOptions = (typeof options === 'function' ? options(req) : options);

      const response = await Axios.request({ ...defaultOptions, ...userOptions });

      res.status(response.status).json(response.data);
    } catch (error) {
      const { response } = error;

      if (response) {
        res.status(response.status).json(response.data);
        return;
      }

      next(error);
    }
  }
);