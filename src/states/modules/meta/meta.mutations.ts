import { MutationTree } from 'vuex';

import { LOAD_INFO_REQUESTED, LOAD_INFO_SUCCESS, LOAD_INFO_FAILED } from './meta.mutations.types';
import { MetaDataState } from './meta.state';
import { MetaData } from '@/models/MetaData';

export const mutations: MutationTree<MetaDataState> = {
  [LOAD_INFO_REQUESTED](state: MetaDataState): void {
    state.isFetching = true;
    state.hasFailed = false;
  },
  [LOAD_INFO_SUCCESS](state: MetaDataState, apiInfo: MetaData): void {
    state.isFetching = false;
    state.hasFailed = false;
    state.api = apiInfo;
  },
  [LOAD_INFO_FAILED](state: MetaDataState, error: any): void {
    state.isFetching = false;
    state.hasFailed = true;
  },
};
