export interface AuthState {
  isAuthenticated: boolean;
  isRegistered: boolean;
  isFetching: boolean;
  loginHasFailed: boolean;
  registerHasFailed: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isRegistered: false,
  isFetching: false,
  loginHasFailed: false,
  registerHasFailed: false,
};
