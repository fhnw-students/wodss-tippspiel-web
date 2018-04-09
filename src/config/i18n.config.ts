import Vue from 'vue';
import VueI18n from 'vue-i18n';

import de from '@/locals/de';
import en from '@/locals/en';

Vue.use(VueI18n);

export const i18n = new VueI18n({
  locale: 'de', // set locale
  fallbackLocale: 'de',
  silentTranslationWarn: true,
  messages: { de, en }, // set locale messages
});
