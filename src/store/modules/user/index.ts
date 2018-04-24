import { actions, actionTypes } from './user.actions';
import { getters, getterTypes } from './user.getters';
import { mutations } from './user.mutations';
import { initialState } from './user.state';

// -------------------------------------------------------------------------
// Export Types & Interfaces
// -------------------------------------------------------------------------

export * from './user.state';

// -------------------------------------------------------------------------
// Define Namespace, Actions & Getters
// -------------------------------------------------------------------------

export const UserNamespace = 'user';

export const UserGetters = {
  IsFetching: `${UserNamespace}/${getterTypes.IS_FETCHING}`,
  HasFailed: `${UserNamespace}/${getterTypes.HAS_FAILED}`,
  GetCurrentUser: `${UserNamespace}/${getterTypes.GET_CURRENT_USER}`,
};

export const UserActions = {
  LoadCurrentUser: `${UserNamespace}/${actionTypes.LOAD_CURRENT_USER}`,
};

// -------------------------------------------------------------------------
// Export Store
// -------------------------------------------------------------------------

export const user = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
