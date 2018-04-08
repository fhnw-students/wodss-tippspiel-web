import { combineReducers } from 'redux';
import { authReducer } from './auth/auth.reducer';
import { AuthState } from './auth/auth.state';

/**
 * @name RootState
 * @description This defines the redux store and can be used
 * in the `mapStateToProps` function wrappers.
 */
export interface RootState {
  auth: AuthState;
}

/**
 * @name rootReducer
 * @description Combines all our reducers
 */
export const rootReducer = combineReducers({
  auth: authReducer,
});
