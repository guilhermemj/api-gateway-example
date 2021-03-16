import 'dotenv/config';
import WebServer from '@guilhermemj/micro-web-server';

import { defaultErrorHandler } from './middlewares';
import routes from './routes';

const {
  SERVER_HTTP_PORT = '3000',
  JWT_SECRET = 'super-secret-secret',
} = process.env;

const httpPort = Number.parseInt(SERVER_HTTP_PORT, 10);
const webServer = new WebServer({ httpPort, routes });

webServer.app.set('jwt-secret', JWT_SECRET);
webServer.app.use(defaultErrorHandler());

// Start application
(async (): Promise<void> => {
  await webServer.start();
  console.log(`Web server started at port ${httpPort}`);
})();
