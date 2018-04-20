import Vue from 'vue';
import { MutationTree } from 'vuex';

import * as tokenService from '@/services/token.service';
import * as mutationTypes from './auth.mutations.types';
import { AuthState } from './auth.state';

export const mutations: MutationTree<AuthState> = {
  [mutationTypes.SIGN_IN_USER_REQUESTED](state: AuthState): void {
    state.isFetching = true;
    state.isAuthenticated = false;
    state.loginHasFailed = false;
  },

  [mutationTypes.SIGN_IN_USER_SUCCESS](state: AuthState, token: string): void {
    tokenService.setToken(token);
    Vue.$http.defaults.headers.common.Authorization = `Bearer ${token}`;

    state.isFetching = false;
    state.isAuthenticated = true;
    state.loginHasFailed = false;
  },

  [mutationTypes.SIGN_IN_USER_FAILED](state: AuthState, error: any): void {
    state.isFetching = false;
    state.isAuthenticated = false;
    state.loginHasFailed = true;
  },

  [mutationTypes.CHECK_AUTH](state: AuthState, error: any): void {
    const token = tokenService.getToken();
    if (token) {
      state.isAuthenticated = true;
      Vue.$http.defaults.headers.common.Authorization = `Bearer ${tokenService.getToken()}`;
    } else {
      state.isAuthenticated = false;
    }
    state.isFetching = false;
    state.loginHasFailed = false;
  },

  [mutationTypes.SIGN_OUT_USER_SUCCESS](state: AuthState): void {
    tokenService.removeToken();
    Vue.$http.defaults.headers.common.Authorization = ``;

    state.isFetching = false;
    state.isAuthenticated = false;
    state.loginHasFailed = false;
  },

  [mutationTypes.RESET_STATE](state: AuthState, error: any): void {
    state.isFetching = false;
    state.isAuthenticated = false;
    state.loginHasFailed = false;
  },
};
