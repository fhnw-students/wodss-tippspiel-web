import Vue from 'vue';

import fontawesome from '@fortawesome/fontawesome';
import fontawesomeSolid from '@fortawesome/fontawesome-free-solid';
import * as Bluebird from 'bluebird';
import 'bootstrap';
import 'isomorphic-fetch';
import 'jquery';
import VeeValidate, { Validator } from 'vee-validate';
import de from 'vee-validate/dist/locale/de';
import en from 'vee-validate/dist/locale/en';

import App from './App.vue';
import { appConfig } from './config/app.config';
import { i18n } from './config/i18n.config';
import { createLogger } from './config/logger.config';
import { Logger } from './plugins/logger.plugin';
import { getRouter } from './router';
import store from './store';
import './styles/main.scss';

// remove out if you don't want a Promise polyfill (remove also from webpack.config.js)
Bluebird.config({ warnings: { wForgottenReturn: false } });

fontawesome.library.add(fontawesomeSolid);

Vue.config.productionTip = false;
Vue.use(Logger);

Vue.use(VeeValidate, {
  dictionary: { en, de },
  locale: i18n.locale,
});
Validator.localize(i18n.locale);

new Vue({
  i18n,
  router: getRouter(store),
  store,
  render: (h) => h(App),
}).$mount('#app');

const log = createLogger('main');
log.info(`The environment is ${appConfig.env}.`);
log.info(`The language is set to ${i18n.locale}.`);
