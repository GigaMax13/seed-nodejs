import { log } from 'winston';

class Logger {
  static emerg(...emerg) {
    log('emerg', ...emerg);
  }

  static alert(...alert) {
    log('alert', ...alert);
  }

  static crit(...crit) {
    log('crit', ...crit);
  }

  static error(...error) {
    log('error', ...error);
  }

  static warning(...warning) {
    log('warning', ...warning);
  }

  static notice(...notice) {
    log('notice', ...notice);
  }

  static info(...info) {
    log('info', ...info);
  }

  static blacklists(req, list = []) {
    req._routeBlacklists.body = list; // eslint-disable-line
  }

  static throw(res, code, ...args) {
    this.error(...args);
    res.status(500).send({ success: false, code, message: res.__('helpers.logger.throw') });
  }
}

module.exports = Logger;
