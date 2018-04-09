import Vue from 'vue';

import fontawesome from '@fortawesome/fontawesome';
import fontawesomeSolid from '@fortawesome/fontawesome-free-solid';
import 'bootstrap';
import 'jquery';

import App from './App.vue';
import { appConfig } from './config/app.config';
import { i18n } from './config/i18n.config';
import { createLogger } from './config/logger.config';
import { Logger } from './plugins/logger.plugin';
import router from './router';
import store from './store';
import './styles/main.scss';

fontawesome.library.add(fontawesomeSolid);

Vue.config.productionTip = false;
Vue.use(Logger);

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');

const log = createLogger('main');
log.info(`The environment is ${appConfig.env}`);
