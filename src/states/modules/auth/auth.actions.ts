import { Credentials } from './auth.actions';
import { ActionContext, ActionTree } from 'vuex';

import { signIn, signOut, registerUser, verifyUser, resetUserPassword } from '@/services/api/auth.api';
import { getToken } from '@/services/token.service';
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
  CHECK_LOCAL_TOKEN: 'CHECK_LOCAL_TOKEN',
  RESET_STATE: 'RESET_STATE',
};

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<AuthState, AuthState> = {
  [actionTypes.SIGN_IN_USER]({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials): void {
    commit(mutationTypes.SIGN_IN_USER_REQUESTED);
    signIn(credentials.username, credentials.password)
      .then(() => commit(mutationTypes.SIGN_IN_USER_SUCCESS))
      .catch((err: any) => commit(mutationTypes.SIGN_IN_USER_FAILED, err));
  },
  [actionTypes.SIGN_OUT_USER]({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials): void {
    signOut()
      .then(() => commit(mutationTypes.SIGN_OUT_USER_SUCCESS))
      .catch((err: any) => commit(mutationTypes.SIGN_OUT_USER_SUCCESS));
  },
  [actionTypes.CHECK_LOCAL_TOKEN]({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials): void {
    const token = getToken();
    if (token) {
      commit(mutationTypes.CHECK_LOCAL_TOKEN_SUCCESS);
    } else {
      commit(mutationTypes.CHECK_LOCAL_TOKEN_FAILED);
    }
  },
  [actionTypes.RESET_STATE]({ commit, state }: ActionContext<AuthState, AuthState>): void {
    commit(mutationTypes.RESET_STATE);
  },
};
