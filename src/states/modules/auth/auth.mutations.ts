import { MutationTree } from 'vuex';

import * as mutationTypes from './auth.mutations.types';
import { AuthState } from './auth.state';

export const mutations: MutationTree<AuthState> = {
  [mutationTypes.SIGN_IN_USER_REQUESTED](state: AuthState): void {
    state.isFetching = true;
    state.isAuthenticated = false;
    state.loginHasFailed = false;
  },
  [mutationTypes.SIGN_IN_USER_SUCCESS](state: AuthState, token: string): void {
    state.isFetching = false;
    state.isAuthenticated = true;
    state.loginHasFailed = false;
  },
  [mutationTypes.SIGN_IN_USER_FAILED](state: AuthState, error: any): void {
    state.isFetching = false;
    state.isAuthenticated = false;
    state.loginHasFailed = true;
  },
  [mutationTypes.CHECK_LOCAL_TOKEN_SUCCESS](state: AuthState, error: any): void {
    state.isFetching = false;
    state.isAuthenticated = true;
    state.loginHasFailed = false;
  },
  [mutationTypes.CHECK_LOCAL_TOKEN_FAILED](state: AuthState, error: any): void {
    state.isFetching = false;
    state.isAuthenticated = false;
    state.loginHasFailed = false;
  },
  [mutationTypes.SIGN_OUT_USER_SUCCESS](state: AuthState, error: any): void {
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
