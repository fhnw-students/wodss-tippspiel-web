import { MutationTree } from 'vuex';

import * as mutationTypes from './auth.mutations.types';
import { AuthState } from './auth.state';

export const mutations: MutationTree<AuthState> = {
  [mutationTypes.SIGN_IN_USER_REQUESTED](state: AuthState): void {
    state.isAuthenticated = false;
    state.isFetching = true;
    state.hasFailed = false;
  },
  [mutationTypes.SIGN_IN_USER_SUCCESS](state: AuthState, token: string): void {
    state.isAuthenticated = true;
    state.isFetching = false;
    state.hasFailed = false;
  },
  [mutationTypes.SIGN_IN_USER_FAILED](state: AuthState, error: any): void {
    state.isAuthenticated = false;
    state.isFetching = false;
    state.hasFailed = true;
  },
  [mutationTypes.CHECK_LOCAL_TOKEN_SUCCESS](state: AuthState, error: any): void {
    state.isAuthenticated = true;
    state.isFetching = false;
    state.hasFailed = false;
  },
  [mutationTypes.CHECK_LOCAL_TOKEN_FAILED](state: AuthState, error: any): void {
    state.isAuthenticated = false;
    state.isFetching = false;
    state.hasFailed = false;
  },
  [mutationTypes.SIGN_OUT_USER_SUCCESS](state: AuthState, error: any): void {
    state.isAuthenticated = false;
    state.isFetching = false;
    state.hasFailed = false;
  },
};
