import { AuthState } from './auth.state';
import { Action } from "redux";
import { getToken } from '../../utils/auth-helpers';
import { AuthAction, SIGN_IN_REQUEST_SUCCESS, SIGN_IN_REQUESTED, SIGN_IN_REQUEST_FAILED } from './auth.actions';
import { error } from 'util';

export function authReducer(
  // Initial State
  state: AuthState = {
    isFetching: false,
    isAuthenticated: getToken() ? true : false,
    error: undefined
  },
  action: AuthAction
): AuthState {

  console.log(action.type);

  switch (action.type) {

    case SIGN_IN_REQUESTED:
      return Object.assign({}, state, {
        isFetching: true,
        isAuthenticated: false,
        error: undefined,
      });

    case SIGN_IN_REQUEST_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: true,
        error: undefined,
      });

    case SIGN_IN_REQUEST_FAILED:
      return Object.assign({}, state, {
        isFetching: false,
        isAuthenticated: false,
        error: action.error,
      });

    default:
      return state;
  }

}
