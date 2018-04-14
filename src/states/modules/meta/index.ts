import { actions, LOAD_API_INFO, SET_SERVER_AVAILABLE, SET_SERVER_UNAVAILABLE } from './meta.actions';
import { getters, IS_FETCHING, API_VERSION, GUI_VERSION, IS_SERVER_AVAILABLE } from './meta.getters';
import { mutations } from './meta.mutations';
import { initialState } from './meta.state';

// -------------------------------------------------------------------------
// Export Types & Interfaces
// -------------------------------------------------------------------------

export * from './meta.state';

// -------------------------------------------------------------------------
// Define Namespace, Actions & Getters
// -------------------------------------------------------------------------

export const MetaDataNamespace = 'meta';

export const MetaDataActions = {
  LoadAPIInfo: `${MetaDataNamespace}/${LOAD_API_INFO}`,
  SetServerAvailable: `${MetaDataNamespace}/${SET_SERVER_AVAILABLE}`,
  SetServerUnavailable: `${MetaDataNamespace}/${SET_SERVER_UNAVAILABLE}`,
};

export const MetaDataGetters = {
  APIVersion: `${MetaDataNamespace}/${API_VERSION}`,
  GUIVersion: `${MetaDataNamespace}/${GUI_VERSION}`,
  IsFetching: `${MetaDataNamespace}/${IS_FETCHING}`,
  IsServerAvailable: `${MetaDataNamespace}/${IS_SERVER_AVAILABLE}`,
};

// -------------------------------------------------------------------------
// Export Store
// -------------------------------------------------------------------------

export const meta = {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
