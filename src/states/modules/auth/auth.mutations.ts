import { MutationTree } from 'vuex';

import * as mutationTypes from './auth.mutations.types';
import { AuthState } from './auth.state';

export const mutations: MutationTree<AuthState> = {
  [mutationTypes.SIGN_IN_USER_REQUESTED](state: AuthState): void {
    state.isAuthenticated = false;
    state.isRegistered = false;
    state.isFetching = true;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
  [mutationTypes.SIGN_IN_USER_SUCCESS](state: AuthState, token: string): void {
    state.isAuthenticated = true;
    state.isRegistered = false;
    state.isFetching = false;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
  [mutationTypes.SIGN_IN_USER_FAILED](state: AuthState, error: any): void {
    state.isAuthenticated = false;
    state.isRegistered = false;
    state.isFetching = false;
    state.loginHasFailed = true;
    state.registerHasFailed = false;
  },
  [mutationTypes.CHECK_LOCAL_TOKEN_SUCCESS](state: AuthState, error: any): void {
    state.isAuthenticated = true;
    state.isRegistered = false;
    state.isFetching = false;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
  [mutationTypes.CHECK_LOCAL_TOKEN_FAILED](state: AuthState, error: any): void {
    state.isAuthenticated = false;
    state.isRegistered = false;
    state.isFetching = false;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
  [mutationTypes.SIGN_OUT_USER_SUCCESS](state: AuthState, error: any): void {
    state.isAuthenticated = false;
    state.isRegistered = false;
    state.isFetching = false;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
  [mutationTypes.REGISTER_USER_REQUESTED](state: AuthState): void {
    state.isAuthenticated = false;
    state.isRegistered = false;
    state.isFetching = true;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
  [mutationTypes.REGISTER_USER_SUCCESS](state: AuthState): void {
    state.isAuthenticated = false;
    state.isRegistered = true;
    state.isFetching = false;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
  [mutationTypes.REGISTER_USER_FAILED](state: AuthState, error: any): void {
    state.isAuthenticated = false;
    state.isRegistered = false;
    state.isFetching = false;
    state.loginHasFailed = true;
    state.registerHasFailed = false;
  },
  [mutationTypes.RESET_STATE](state: AuthState, error: any): void {
    state.isRegistered = false;
    state.isFetching = false;
    state.loginHasFailed = false;
    state.registerHasFailed = false;
  },
};
