import Moment from 'moment-timezone';
import StringMask from 'string-mask';

class Conversion {
  static toLocal(datetime, timezone) {
    return Moment.utc(datetime).tz(timezone);
  }

  static toUTC(datetime, timezone) {
    return Moment.tz(datetime, timezone).utc();
  }

  static toUnixEpoch(dateString) {
    return Moment.utc(dateString).valueOf();
  }

  static format(string, mask) {
    return StringMask.apply(string, mask);
  }

  static number(num) {
    return Number(String(num).replace(/[^0-9]/g, ''));
  }

  static float(num) {
    return Number(String(num).replace(/[^0-9.]/g, ''));
  }

  static cpf(string) {
    return this.format(string, '000.000.000-00');
  }

  static cnpj(string) {
    return this.format(string, '00.000.000/0000-00');
  }

  static cep(string) {
    return this.format(string, '00000-000');
  }

  static underscore2Camelcase(string) {
    return string.replace(/(_([a-z0-9])+)/gi, (str) => {
      return this.capitalize(str.split('_')[1]);
    });
  }

  static capitalize(string) {
    return string.replace(/\w\S*/g, (str) => {
      return str.charAt(0).toUpperCase() + str.substr(1).toLowerCase();
    });
  }
}

export { Conversion };
