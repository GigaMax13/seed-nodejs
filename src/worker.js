import { Cron, LoggerConfig } from './config';
import { Logger } from './helpers';

import './config/i18n';

LoggerConfig.init();

Cron.add('worker-test', '* * * * * *', () => {
  Logger.info(__('cron.test'));
  Cron.remove('worker-test');
}, true);

