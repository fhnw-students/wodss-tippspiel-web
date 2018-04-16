import { Credentials } from './auth.actions';
import { ActionContext, ActionTree } from 'vuex';

import { signIn, signOut, registerUser } from '@/services/api/auth.api';
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

export interface NewUser extends Credentials {
  email: string;
}

// -------------------------------------------------------------------------
// Define Action Types
// -------------------------------------------------------------------------

export const actionTypes = {
  SIGN_IN_USER: 'SIGN_IN_USER',
  SIGN_OUT_USER: 'SIGN_OUT_USER',
  CHECK_LOCAL_TOKEN: 'CHECK_LOCAL_TOKEN',
  REGISTER_USER: 'REGISTER_USER',
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
  [actionTypes.REGISTER_USER]({ commit, state }: ActionContext<AuthState, AuthState>, newUser: NewUser): void {
    commit(mutationTypes.REGISTER_USER_REQUESTED);
    registerUser(newUser.username, newUser.email, newUser.password)
      .then(() => commit(mutationTypes.REGISTER_USER_SUCCESS))
      .catch((err: any) => commit(mutationTypes.REGISTER_USER_FAILED, err));
  },
  [actionTypes.RESET_STATE]({ commit, state }: ActionContext<AuthState, AuthState>, newUser: NewUser): void {
    commit(mutationTypes.RESET_STATE);
  },
};
