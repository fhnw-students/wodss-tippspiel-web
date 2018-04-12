import { ActionContext, ActionTree } from 'vuex';

import { LOAD_INFO_REQUESTED, LOAD_INFO_SUCCESS, LOAD_INFO_FAILED } from './meta.mutations.types';
import { MetaDataState } from './meta.state';
import { getAPIInfo } from '@/services/api/info.api';
import { MetaData } from '@/models/MetaData';

// -------------------------------------------------------------------------
// Define Types & Interfaces
// -------------------------------------------------------------------------

// -------------------------------------------------------------------------
// Define Action Types
// -------------------------------------------------------------------------

export const LOAD_API_INFO = 'LOAD_API_INFO';

// -------------------------------------------------------------------------
// Define Action Object
// -------------------------------------------------------------------------

export const actions: ActionTree<MetaDataState, MetaDataState> = {
  [LOAD_API_INFO]({ commit, state }: ActionContext<MetaDataState, MetaDataState>): void {
    commit(LOAD_INFO_REQUESTED);
    getAPIInfo()
      .then((apiInfo: MetaData) => commit(LOAD_INFO_SUCCESS, apiInfo))
      .catch((err: any) => commit(LOAD_INFO_FAILED, err));
  },
};
