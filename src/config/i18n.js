import { join } from 'path';
import i18n from 'i18n';

/* i18n */
i18n.configure({
  locales: [
    'pt-BR',
    'en-US',
  ],
  fallbacks: {
    pt: 'pt-BR',
    en: 'en-US',
  },
  defaultLocale: 'pt-BR',
  objectNotation: true,
  directory: join(__dirname, '..', 'locales'),
  register: global,
});

export default i18n;
