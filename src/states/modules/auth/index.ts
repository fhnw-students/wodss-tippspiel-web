import { getters } from './auth.getters';
import { actions } from './auth.actions';
import { mutations } from './auth.mutations';

const initialState = {
  isAuthenticated: false,
};

export * from './auth.state';
export { Credentials } from './auth.actions';

export default {
  namespaced: true,
  state: initialState,
  getters,
  actions,
  mutations,
};
