export interface AuthState {
  isAuthenticated: boolean;
  isFetching: boolean;
  hasFailed: boolean;
}

export const initialState: AuthState = {
  isAuthenticated: false,
  isFetching: false,
  hasFailed: false,
};
