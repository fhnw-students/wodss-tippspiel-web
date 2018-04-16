import { AuthState } from './auth.state';

// -------------------------------------------------------------------------
// Define Getter Types
// -------------------------------------------------------------------------

export const getterTypes = {
  IS_AUTHENTICATED: 'IS_AUTHENTICATED',
  IS_REGISTERED: 'IS_REGISTERED',
  IS_FETCHING: 'IS_FETCHING',
  LOGIN_HAS_FAILED: 'LOGIN_HAS_FAILED',
  REGISTER_HAS_FAILED: 'REGISTER_HAS_FAILED',
};

// -------------------------------------------------------------------------
// Define Getter Object
// -------------------------------------------------------------------------

export const getters = {
  [getterTypes.IS_AUTHENTICATED](state: AuthState): boolean {
    return state.isAuthenticated;
  },
  [getterTypes.IS_REGISTERED](state: AuthState): boolean {
    return state.isRegistered;
  },
  [getterTypes.IS_FETCHING](state: AuthState): boolean {
    return state.isFetching;
  },
  [getterTypes.LOGIN_HAS_FAILED](state: AuthState): boolean {
    return state.loginHasFailed;
  },
  [getterTypes.REGISTER_HAS_FAILED](state: AuthState): boolean {
    return state.registerHasFailed;
  },
};
