import { actions, SIGN_IN_USER } from './auth.actions';
import { getters, IS_AUTHENTICATED, IS_FETCHING, HAS_FAILED } from './auth.getters';
import { mutations } from './auth.mutations';

// -------------------------------------------------------------------------
// Initial State
// -------------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isFetching: false,
  hasFailed: false,
};

// -------------------------------------------------------------------------
// Export Types & Interfaces
// -------------------------------------------------------------------------

export * from './auth.state';
export { Credentials } from './auth.actions';

// -------------------------------------------------------------------------
// Define Namespace, Actions & Getters
// -------------------------------------------------------------------------

export const AuthNamespace = 'auth';

export const AuthActions = {
  SignInUser: `${AuthNamespace}/${SIGN_IN_USER}`,
};

export const AuthGetters = {
  IsAuthenticated: `${AuthNamespace}/${IS_AUTHENTICATED}`,
  IsFetching: `${AuthNamespace}/${IS_FETCHING}`,
  HasFailed: `${AuthNamespace}/${HAS_FAILED}`,
};

// -------------------------------------------------------------------------
// Export Store
// -------------------------------------------------------------------------

export const auth = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
