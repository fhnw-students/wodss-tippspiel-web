/* ============
 * Vuex Store
 * ============
 *
 * The store of the application.
 *
 * http://vuex.vuejs.org/en/index.html
 */

import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

import { auth, AuthState } from '@/store/modules/auth';
import { meta, MetaDataState } from '@/store/modules/meta';

/**
 * Define your Store here
 */
export interface Store {
  auth: AuthState;
  meta: MetaDataState;
}

const debug = process.env.NODE_ENV !== 'production';

export const store = new Vuex.Store<Store>({
  /**
   * Assign the modules to the store.
   */
  modules: {
    auth: auth as any,
    meta: meta as any,
  },

  /**
   * If strict mode should be enabled.
   */
  strict: debug,

  /**
   * Plugins used in the store.
   */
  plugins: debug ? [createLogger({})] : [],
});
