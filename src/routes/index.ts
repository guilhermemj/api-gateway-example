import { Route, Request, Response } from '@guilhermemj/micro-web-server';

export default [
  {
    method: 'get',
    path: '/',
    controller: (req: Request, res: Response): void => {
      res.json('Hello world!');
    },
  },
] as Array<Route>;
