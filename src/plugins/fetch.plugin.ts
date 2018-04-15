import { PluginObject, PluginFunction } from 'vue';

import { FetchClient } from '@/lib/fetch-client';

export const Fetch: PluginObject<any> = {
  install(Vue, options): void {

    Vue.$fetchClient = () => {
      return new FetchClient(options);
    };

  },
};
