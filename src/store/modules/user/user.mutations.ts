import { actionTypes } from './../auth/auth.actions';
import { MutationTree } from 'vuex';

import { User } from '@/models/User';
import {
  LOAD_CURRENT_USER_REQUESTED,
  LOAD_CURRENT_USER_SUCCESS,
  LOAD_CURRENT_USER_FAILED
} from './user.mutations.types';
import { UserState } from './user.state';

export const mutations: MutationTree<UserState > = {
  [LOAD_CURRENT_USER_REQUESTED](state: UserState ): void {
    state.isFetching = true;
    state.hasFailed = false;
  },
  [LOAD_CURRENT_USER_SUCCESS](state: UserState, currentUser: User ): void {
   state.isFetching = false;
   state.hasFailed = false;
   state.currentUser = currentUser;
   },
  [LOAD_CURRENT_USER_FAILED](state: UserState , error: any): void {
    state.isFetching = false;
    state.hasFailed = true;
  },
};
