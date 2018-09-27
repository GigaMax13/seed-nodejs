import { config } from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import bodyParser from 'body-parser';
import compression from 'compression';

import LoggerConfig from './config/LoggerConfig';
import i18n from './config/i18n';
import Logger from './helpers/Logger';

import Users from './routes/Users';

config();

const {
  BODY_LIMIT,
  PORT,
} = process.env;

LoggerConfig.init();

/* Express initialization */
const app = express();

/* Express utilities */
app.use(helmet());
app.use(cors());
app.use(compression());
app.use(i18n.init);
app.use(bodyParser.json({
  limit: BODY_LIMIT,
}));

/* Log express request and response */
LoggerConfig.expressRequest(app);

/* Status endpoint */
app.get(['/', '/status'], (req, res) => {
  res.send('ok');
});

/* Routes */
app.use('/users', Users);

/* Log errors */
LoggerConfig.expressError(app);

app.all('*', (req, res) => {
  res.status(404).send({
    success: false,
    message: req.__('server.error.404'),
  });
});

/* Startup message */
app.listen(PORT, () => {
  Logger.info(`Server started on port ${PORT}`);
});
