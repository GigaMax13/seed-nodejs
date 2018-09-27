import LoggerConfig from './config/LoggerConfig';
import Logger from './helpers/Logger';
import Cron from './config/Cron';
import './config/i18n';

LoggerConfig.init();

Cron.add('worker-test', '* * * * * *', () => {
  Logger.info(__('cron.test'));
  Cron.remove('worker-test');
}, true);

