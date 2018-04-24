import { user } from './index';
import { UserState } from './user.state';
import { User } from '@/models/User';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const getterTypes = {
  IS_FETCHING: 'IS_FETCHING',
  HAS_FAILED: 'HAS_FAILED',
  GET_CURRENT_USER: 'GET_CURRENT_USER',
};

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [getterTypes.IS_FETCHING](state: UserState): boolean {
    return state.isFetching;
  },
  [getterTypes.HAS_FAILED](state: UserState): boolean {
    return state.hasFailed;
  },
  [getterTypes.GET_CURRENT_USER](state: UserState): User {
    return state.currentUser;
  },
};
