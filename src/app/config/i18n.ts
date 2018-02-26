import * as i18next from 'i18next';
import * as LanguageDetector from 'i18next-browser-languagedetector';

import de_CHTranslation from '../../locales/de_CH.json';
import en_USTranslation from '../../locales/en_US.json';

// -------------------------------------------------------------------------
// Translations
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// i18n Configurations
// -------------------------------------------------------------------------

export const i18n = i18next
  .use(LanguageDetector)
  .init({
    resources: {
      'en-US': {
        translation: en_USTranslation
      },
      'de-CH': {
        translation: de_CHTranslation
      }
    },
    fallbackLng: {
      'de': ['de-CH', 'en-US'],
      'de-DE': ['de-CH', 'en-US'],
      'default': ['en-US']
    },
    debug: false,
    detection: {
      order: ['localStorage', 'navigator'],
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage']
    }
  });
