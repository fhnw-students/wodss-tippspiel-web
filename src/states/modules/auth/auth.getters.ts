import { AuthState } from './auth.state';

export const getters = {
  isAuthenticated: (state: AuthState) => state.isAuthenticated,
};
