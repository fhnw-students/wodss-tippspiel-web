import Vue from 'vue';

import 'isomorphic-fetch';

import '@/plugins/bootstrap.plugin';
import '@/plugins/bluebird.plugin';
import '@/plugins/vuex.plugin';
import '@/plugins/logger.plugin';
import '@/plugins/noty.plugin';
import '@/plugins/vee-validate.plugin';
import '@/plugins/fontawesome.plugin';
import { i18n } from '@/plugins/i18n.plugin';
import { router } from '@/plugins/vue-router.plugin';

import { MetaDataActions } from '@/store/modules/meta';
import App from './App.vue';
import { appConfig } from './config/app.config';
import { Fetch } from './plugins/fetch.plugin';
import { store } from './store/index';
import { AuthActions } from './store/modules/auth/index';
import './styles/main.scss';

Vue.config.productionTip = false;

// TODO: Replace this with axios
Vue.use(Fetch, {
  basePath: appConfig.apiPath,
  store,
});

store.dispatch(MetaDataActions.LoadAPIInfo);
store.dispatch(AuthActions.CheckLocalToken);

new Vue({

  /**
   * The localization plugin.
   */
  i18n,

  /**
   * The router.
   */
  router,

  /**
   * The Vuex store.
   */
  store,

  /**
   * Will render the application.
   *
   * @param {Function} h Will create an element.
   */
  render: (h) => h(App),
})
  /**
   * Bind the Vue instance to the HTML.
   */
  .$mount('#app');

const log = Vue.$createLogger('main');
log.info(`The environment is ${appConfig.env}.`);
log.info(`The language is set to ${i18n.locale}.`);
