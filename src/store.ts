import Vue from 'vue';
import Vuex from 'vuex';

import { auth } from './states/modules/auth';
import { meta } from './states/modules/meta';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    auth: auth as any,
    meta: meta as any,
  },
  strict: debug,
});
