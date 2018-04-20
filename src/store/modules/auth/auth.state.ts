export interface AuthState {
  isAuthenticated: boolean;
  isFetching: boolean;
  loginHasFailed: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  loginHasFailed: false,
};
