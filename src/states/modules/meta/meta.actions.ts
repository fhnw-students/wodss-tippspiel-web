import { ActionContext, ActionTree } from 'vuex';

import { LOAD_INFO_REQUESTED, LOAD_INFO_SUCCESS, LOAD_INFO_FAILED } from './meta.mutations.types';
import { MetaDataState } from './meta.state';
import { getApiInfo } from '@/services/api/info.api';
import { ApiInfo } from '@/models/ApiInfo';

// -------------------------------------------------------------------------
// Define Types & Interfaces
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Define Action Types
// -------------------------------------------------------------------------

export const LOAD_API_INFO = 'LOAD_API_INFO';
export const SET_SERVER_AVAILABLE = 'SET_SERVER_AVAILABLE';
export const SET_SERVER_UNAVAILABLE = 'SET_SERVER_UNAVAILABLE';

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<MetaDataState, MetaDataState> = {
  [LOAD_API_INFO]({ commit, state }: ActionContext<MetaDataState, MetaDataState>): void {
    commit(LOAD_INFO_REQUESTED);
    getApiInfo()
      .then((apiInfo: ApiInfo) => commit(LOAD_INFO_SUCCESS, apiInfo))
      .catch((err: any) => commit(LOAD_INFO_FAILED, err));
  },
  [SET_SERVER_AVAILABLE]({ commit, state }: ActionContext<MetaDataState, MetaDataState>): void {
    commit(SET_SERVER_AVAILABLE);
  },
  [SET_SERVER_UNAVAILABLE]({ commit, state }: ActionContext<MetaDataState, MetaDataState>): void {
    commit(SET_SERVER_UNAVAILABLE);
  },
};
