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
}

export { Logger };
