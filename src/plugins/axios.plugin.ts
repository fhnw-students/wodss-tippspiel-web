import { router } from './vue-router.plugin';
/* ============
 * Axios
 * ============
 *
 * Promise based HTTP client for the browser and node.js.
 * Because Vue Resource has been retired, Axios will now been used
 * to perform AJAX-requests.
 *
 * https://github.com/mzabriskie/axios
 */

import Vue, { PluginFunction, PluginObject } from 'vue';

import Axios from 'axios';

import { appConfig } from '@/config/app.config';
import { store } from '@/store';
import { AuthActions } from '@/store/modules/auth';
import { MetaDataActions } from '@/store/modules/meta';
import { i18n } from '@/plugins/i18n.plugin';
import { router } from '@/plugins/vue-router.plugin';

const log = Vue.$createLogger('axios');

/*
 * Axsios common headers and default configurations
 */
Axios.defaults.baseURL = appConfig.apiPath;
Axios.defaults.headers.common.Accept = 'application/json';
Axios.defaults.headers.common.ContentType = 'application/json';

/*
 * Axsios request intercepter to set i18n local
 */
Axios.interceptors.request.use(
  (config) => {
    config.headers['Accept-Language'] = i18n.locale;
    return config;
  },
  (error) => error
);

/*
 * Axsios response intercepter to catch 401 responses
 */
Axios.interceptors.response.use(
  (response) => response,
  (error) => {

    if (!error.response) {
      store.dispatch(MetaDataActions.SetServerUnavailable);
    }

    if (error.response && error.response.status === 401 && store.state.auth.isAuthenticated) {
      store.dispatch(AuthActions.SignOutUser);
    }

    if (error.response.status === 404) {
      router.push({
        name: 'notFound',
      });
    } else {
      return Promise.reject(error);
    }

  }
);

export const Http: PluginObject<any> = {
  install(VueInstance, options): void {
    VueInstance.$http = Axios;
    VueInstance.prototype.$http = Axios;
  },
};

Vue.use(Http);
