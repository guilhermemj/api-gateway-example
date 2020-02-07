import 'dotenv/config';
import 'module-alias/register';

import WebServer from '@guilhermemj/micro-web-server';

import routes from './routes';

const {
  SERVER_HTTP_PORT = '3000',
} = process.env;

const httpPort = Number.parseInt(SERVER_HTTP_PORT, 10);
const webServer = new WebServer({ httpPort, routes });

// Start application
(async (): Promise<void> => {
  await webServer.start();
  console.log(`Web server started at port ${httpPort}`);
})();
