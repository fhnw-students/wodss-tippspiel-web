import { ActionContext, ActionTree } from 'vuex';

import { SIGN_IN_USER_REQUESTED, SIGN_IN_USER_SUCCESS } from './auth.mutations.types';
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

export const SIGN_IN_USER = 'SIGN_IN_USER';

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<AuthState, AuthState> = {
  [SIGN_IN_USER]({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials): void {
    commit(SIGN_IN_USER_REQUESTED);
    setTimeout(() => commit(SIGN_IN_USER_SUCCESS, 'token'), 1000);
  },
};
