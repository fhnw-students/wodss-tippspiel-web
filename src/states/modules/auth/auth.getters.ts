import { AuthState } from './auth.state';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
export const IS_FETCHING = 'IS_FETCHING';
export const HAS_FAILED = 'HAS_FAILED';

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [IS_AUTHENTICATED](state: AuthState): boolean {
    return state.isAuthenticated;
  },
  [IS_FETCHING](state: AuthState): boolean {
    return state.isFetching;
  },
  [HAS_FAILED](state: AuthState): boolean {
    return state.hasFailed;
  },
};
