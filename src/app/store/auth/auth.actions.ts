import { Action, ActionCreator, Dispatch, cr } from "redux";
import { fetchToken, Credentials } from '../../resources/auth.resources';
import { setToken } from '../../utils/auth-helpers';

// -------------------------------------------------------------------------
// Actions Keys
// -------------------------------------------------------------------------

// export const SIGN_IN_REQUEST = "SIGN_IN_REQUEST";
export const SIGN_IN_REQUESTED = "SIGN_IN_REQUESTED";
export const SIGN_IN_REQUEST_SUCCESS = "SIGN_IN_REQUEST_SUCCESS";
export const SIGN_IN_REQUEST_FAILED = "SIGN_IN_REQUEST_FAILED";

// export const SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST";
export const SIGN_OUT_REQUEST_SUCCESS = "SIGN_OUT_REQUEST_SUCCESS";
export const SIGN_OUT_REQUEST_FAILED = "SIGN_OUT_REQUEST_FAILED";

// -------------------------------------------------------------------------
// Action functions
// -------------------------------------------------------------------------

const signInUserSuccess: ActionCreator<AuthAction> = (body: any): AuthAction => {
  setToken(body);
  return { type: SIGN_IN_REQUEST_SUCCESS, body };
};

const signInUserFailed: ActionCreator<AuthAction> = (error: any): AuthAction => {
  return { type: SIGN_IN_REQUEST_FAILED, error };
};

const signInUserRequested: ActionCreator<AuthAction> = (): AuthAction => {
  return { type: SIGN_IN_REQUESTED };
};

const signInUser: ActionCreator<any> = (credentials: Credentials): any => (dispatch: Dispatch<any>) => {
  dispatch(signInUserRequested());
  fetchToken(credentials)
    .then(token => dispatch(signInUserSuccess(token)))
    .catch(error => dispatch(signInUserFailed(error)));
};

// -------------------------------------------------------------------------
// Main exports
// -------------------------------------------------------------------------

export interface AuthAction extends Action {
  body?: any;
  error?: any;
}

export interface AuthActions {
  signInUser(credentials: Credentials): ActionCreator<AuthAction>;
  // signOut(): ActionCreator<AuthAction>;
}

export const authActions: AuthActions = {
  signInUser,
  // signOut
};
