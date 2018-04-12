import { actions, LOAD_API_INFO } from './meta.actions';
import { getters, IS_FETCHING, API_VERSION, GUI_VERSION } from './meta.getters';
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
};

export const MetaDataGetters = {
  APIVersion: `${MetaDataNamespace}/${API_VERSION}`,
  GUIVersion: `${MetaDataNamespace}/${GUI_VERSION}`,
  IsFetching: `${MetaDataNamespace}/${IS_FETCHING}`,
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
