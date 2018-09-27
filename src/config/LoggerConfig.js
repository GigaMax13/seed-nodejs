import { config } from 'dotenv';
import Winston from 'winston';
import ExpressWinston from 'express-winston';
import WinstonFirehose from 'winston-firehose';
import Request from 'request';
import RequestDebug from 'request-debug';
import * as moment from 'moment-timezone';

import Logger from '../helpers/Logger';

config();

const {
  CONSOLE,
  FIREHOSE,
  FIREHOSE_STREAM_NAME,
  FIREHOSE_REGION,
  FIREHOSE_ACCESS_KEY_ID,
  FIREHOSE_SECRET_ACCESS_KEY,
} = process.env;

const instances = {
  init: false,
  expressRequest: false,
  expressError: false,
};

class LoggerConfig {
  static init() {
    if (instances.init) {
      throw Error('Logger: init already executed');
    }

    instances.init = true;
    Winston.configure({
      exitOnError: false,
      levels: this.getLevels(),
      colors: this.getColors(),
      transports: this.getTransports(),
    });

    RequestDebug(Request, this.requestDebugFormatter);
    ExpressWinston.requestWhitelist.push('body');
    ExpressWinston.responseWhitelist.push('body');
  }

  static getTransports() {
    const transports = [];

    /* https://github.com/pkallos/winston-firehose */
    if (FIREHOSE === 'true') {
      transports.push(new WinstonFirehose({
        streamName: FIREHOSE_STREAM_NAME,
        firehoseOptions: {
          region: FIREHOSE_REGION,
          accessKeyId: FIREHOSE_ACCESS_KEY_ID,
          secretAccessKey: FIREHOSE_SECRET_ACCESS_KEY,
        },
      }));
    }

    if (CONSOLE === 'true') {
      transports.push(new Winston.transports.Console({
        timestamp: () => {
          return moment.tz('America/Sao_Paulo').format('DD-MM-YYYY HH:mm:ss');
        },
        json: false,
        colorize: true,
      }));
    }

    return transports;
  }

  static getLevels() {
    return {
      emerg: 0,
      alert: 1,
      crit: 2,
      error: 3,
      warning: 4,
      notice: 5,
      info: 6,
      debug: 7, // 'debug' entries were not displayed
    };
  }

  static getColors() {
    return {
      emerg: 'bgRed',
      alert: 'bgMagenta',
      crit: 'bgRed',
      error: 'red',
      warning: 'yellow',
      notice: 'bgBlue',
      info: 'green',
      debug: 'white',
    };
  }

  static requestDebugFormatter(type, data) {
    let message;
    let status = 0;

    if (type === 'request') {
      message = {
        id: data.debugId,
        type,
        date: moment.tz('America/Sao_Paulo'),
        url: data.uri,
        method: data.method,
        message: data.body,
      };
    } else if (type === 'response') {
      status = data.statusCode;
      message = {
        id: data.debugId,
        type,
        date: moment.tz('America/Sao_Paulo'),
        status,
        message: data.body,
      };
    }

    if (message) {
      switch (LoggerConfig.getLevelByStatusCode(status)) {
        case 'warning': Logger.warning(message); break;
        case 'error': Logger.error(message); break;
        case 'crit': Logger.crit(message); break;
        default: Logger.info(message);
      }
    } else {
      Logger.warning(type, data);
    }
  }

  static expressRequest(app) {
    if (instances.expressRequest) {
      throw Error('Logger: expressRequest already executed');
    }

    instances.expressRequest = true;
    app.use(ExpressWinston.logger(this.getLoggerOptions()));
  }

  static expressError(app) {
    if (instances.expressError) {
      throw Error('Logger: expressError already executed');
    }

    instances.expressError = true;
    app.use(ExpressWinston.errorLogger(this.getLoggerOptions()));

    app.use((err, req, res, next) => { // eslint-disable-line
      if (err && err.stack) {
        console.error(err.stack); // eslint-disable-line
      } else {
        console.log(err); // eslint-disable-line
      }

      res.status(err.status || 500);
      res.send({
        error: true,
        message: req.__('server.error.500'),
      });
    });
  }

  static getLevelByStatusCode(code) {
    let level = 'info';
    if (code >= 400) { level = 'warning'; }
    if (code >= 500) { level = 'error'; }
    if (code === 401 || code === 403) { level = 'crit'; }
    return level;
  }

  /* https://github.com/bithavoc/express-winston */
  static getLoggerOptions() {
    const requestFilterBlacklist = ['headers', 'httpVersion', 'originalUrl'];
    const ignoredRoutes = ['/', '/status', '/favicon.ico'];

    return {
      winstonInstance: Winston,
      meta: true,
      msg: 'HTTP {{res.statusCode}} {{req.method}} {{req.url}}',
      colorStatus: true,
      ignoredRoutes,
      requestFilter: (req, propName) => {
        if (requestFilterBlacklist.indexOf(propName) >= 0) {
          return undefined;
        }
        return req[propName];
      },
      dynamicMeta: (req) => {
        return {
          session: req.session ? req.session.id : null,
          user: req.session ? req.session.user.id : null,
        };
      },
      skip: (req) => {
        return false && req.method.toUpperCase() === 'GET';
      },
    };
  }
}

export default LoggerConfig;
