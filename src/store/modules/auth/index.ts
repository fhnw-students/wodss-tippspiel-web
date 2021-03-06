import { actions, actionTypes } from './auth.actions';
import { getters, getterTypes } from './auth.getters';
import { mutations } from './auth.mutations';
import { initialState } from './auth.state';

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
  CheckAuth: `${AuthNamespace}/${actionTypes.CHECK_AUTH}`,
  SignInUser: `${AuthNamespace}/${actionTypes.SIGN_IN_USER}`,
  SignOutUser: `${AuthNamespace}/${actionTypes.SIGN_OUT_USER}`,
  ResetState: `${AuthNamespace}/${actionTypes.RESET_STATE}`,
};

export const AuthGetters = {
  IsFetching: `${AuthNamespace}/${getterTypes.IS_FETCHING}`,
  IsAuthenticated: `${AuthNamespace}/${getterTypes.IS_AUTHENTICATED}`,
  LoginHasFailed: `${AuthNamespace}/${getterTypes.LOGIN_HAS_FAILED}`,
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
