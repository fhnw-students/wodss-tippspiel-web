import { ActionContext, ActionTree } from 'vuex';

import * as authApi from '@/services/api/auth.api';
import * as mutationTypes from './auth.mutations.types';
import { AuthState } from './auth.state';

// -------------------------------------------------------------------------
// Define Types & Interfaces
// -------------------------------------------------------------------------

export interface Credentials {
  username: string;
  password: string;
}

// -------------------------------------------------------------------------
// Define Action Types
// -------------------------------------------------------------------------

export const actionTypes = {
  SIGN_IN_USER: 'SIGN_IN_USER',
  SIGN_OUT_USER: 'SIGN_OUT_USER',
  CHECK_AUTH: 'CHECK_AUTH',
  RESET_STATE: 'RESET_STATE',
};

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<AuthState, AuthState> = {
  [actionTypes.SIGN_IN_USER]({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials): void {
    commit(mutationTypes.SIGN_IN_USER_REQUESTED);
    authApi.signIn(credentials.username, credentials.password)
      .then(() => commit(mutationTypes.SIGN_IN_USER_SUCCESS))
      .catch((err: any) => commit(mutationTypes.SIGN_IN_USER_FAILED, err));
  },
  [actionTypes.SIGN_OUT_USER]({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials): void {
    authApi.signOut()
      .then(() => commit(mutationTypes.SIGN_OUT_USER_SUCCESS))
      .catch((err: any) => commit(mutationTypes.SIGN_OUT_USER_SUCCESS));
  },
  [actionTypes.CHECK_AUTH]({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials): void {
    commit(mutationTypes.CHECK_AUTH);
  },
  [actionTypes.RESET_STATE]({ commit, state }: ActionContext<AuthState, AuthState>): void {
    commit(mutationTypes.RESET_STATE);
  },
};
