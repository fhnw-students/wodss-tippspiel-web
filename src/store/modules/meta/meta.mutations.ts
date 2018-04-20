import { MutationTree } from 'vuex';

import { ApiInfo } from '@/models/ApiInfo';
import {
  LOAD_INFO_FAILED,
  LOAD_INFO_REQUESTED,
  LOAD_INFO_SUCCESS,
  SET_SERVER_AVAILABLE,
  SET_SERVER_UNAVAILABLE,
} from './meta.mutations.types';
import { MetaDataState } from './meta.state';

export const mutations: MutationTree<MetaDataState> = {
  [LOAD_INFO_REQUESTED](state: MetaDataState): void {
    state.isFetching = true;
    state.hasFailed = false;
  },
  [LOAD_INFO_SUCCESS](state: MetaDataState, apiInfo: ApiInfo): void {
    state.isFetching = false;
    state.hasFailed = false;
    state.api = apiInfo;
  },
  [LOAD_INFO_FAILED](state: MetaDataState, error: any): void {
    state.isFetching = false;
    state.hasFailed = true;
  },
  [SET_SERVER_AVAILABLE](state: MetaDataState, error: any): void {
    state.isServerAvailable = true;
  },
  [SET_SERVER_UNAVAILABLE](state: MetaDataState, error: any): void {
    state.isServerAvailable = false;
  },
};
