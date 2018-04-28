import { ActionContext, ActionTree } from 'vuex';
import { getCurrentUser } from '@/services/api/user.api';
import { LOAD_CURRENT_USER_REQUESTED, LOAD_CURRENT_USER_SUCCESS, LOAD_CURRENT_USER_FAILED } from './user.mutations.types';
import { UserState } from './user.state';
import { User } from '@/models/User';

// -------------------------------------------------------------------------
// Define Types & Interfaces
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Define Action Types
// -------------------------------------------------------------------------

export const actionTypes = {
  LOAD_CURRENT_USER: 'LOAD_CURRENT_USER',
};

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<UserState, UserState> = {
  [actionTypes.LOAD_CURRENT_USER]({ commit, state }: ActionContext<UserState, UserState>): void {
    commit(LOAD_CURRENT_USER_REQUESTED);
    getCurrentUser()
      .then((currentUser: User) => commit(LOAD_CURRENT_USER_SUCCESS, currentUser))
      .catch((err: any) => commit(LOAD_CURRENT_USER_FAILED, err));
  },
};
