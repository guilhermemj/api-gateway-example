import 'dotenv/config';
import 'module-alias/register';

import WebServer from '@guilhermemj/micro-web-server';
import mongoose from 'mongoose';

import routes from './routes';
import models from './models';

const {
  SERVER_HTTP_PORT = '3000',
  DATABASE_URI = '',
} = process.env;

const httpPort = Number.parseInt(SERVER_HTTP_PORT, 10);
const webServer = new WebServer({ httpPort, routes });

// Start application
(async (): Promise<void> => {
  await webServer.start();
  console.log(`Web server started at port ${httpPort}`);

  await mongoose.connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  Object.entries(models).forEach(
    ([modelName, schema]) => mongoose.model(modelName, schema)
  );
})();
