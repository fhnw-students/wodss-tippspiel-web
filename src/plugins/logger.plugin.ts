import * as _Vue from 'vue';
import { PluginObject, PluginFunction } from 'vue';

import * as JSLogger from 'js-logger';

import { createLogger } from '../config/logger.config';

export const Logger: PluginObject<any> = {
  install(Vue, options): void {

    Vue.prototype.$createLogger = (channelOrClass: string | any) => {
      try {
        return createLogger(channelOrClass.__proto__.constructor.name);
      } catch (_) {
        return createLogger(channelOrClass);
      }
    };

  },
};
