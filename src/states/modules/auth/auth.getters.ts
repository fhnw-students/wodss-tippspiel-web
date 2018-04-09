import { AuthState } from './auth.state';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const IS_AUTHENTICATED = 'IS_AUTHENTICATED';

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [IS_AUTHENTICATED](state: AuthState) {
    return state.isAuthenticated;
  },
};
