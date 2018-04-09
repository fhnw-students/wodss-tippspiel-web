import { ActionTree, ActionContext } from 'vuex';
import { AuthState } from './auth.state';
import { SIGN_IN_USER_REQUESTED, SIGN_IN_USER_SUCCESS } from './auth.mutations.types';

export interface Credentials {
  username: string;
  password: string;
}

export const actions: ActionTree<AuthState, AuthState> = {
  signInUser({ commit, state }: ActionContext<AuthState, AuthState>, credentials: Credentials) {
    commit(SIGN_IN_USER_REQUESTED);
    setTimeout(() => commit(SIGN_IN_USER_SUCCESS, 'token'), 1000);
  },
};
