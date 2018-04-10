import { i18n } from './../config/i18n.config';
import * as _Vue from 'vue';
import { PluginObject, PluginFunction } from 'vue';

import _Noty from 'noty';

export const Noty: PluginObject<any> = {
  install(Vue, options: { i18n: any }): void {

    const createNoty = (text: string, type: any = 'alert') => {
      return new _Noty({
        type,
        text,
        theme: 'relax',
        timeout: 3000,
        progressBar: true,
      }).show();
    };

    Vue.prototype.$noty = {
      alert: (translationKey: string) => createNoty(options.i18n.t(translationKey), 'alert'),
      success: (translationKey: string) => createNoty(options.i18n.t(translationKey), 'success'),
      warning: (translationKey: string) => createNoty(options.i18n.t(translationKey), 'warning'),
      error: (translationKey: string) => createNoty(options.i18n.t(translationKey), 'error'),
      info: (translationKey: string) => createNoty(options.i18n.t(translationKey), 'info'),
    };

  },
};
