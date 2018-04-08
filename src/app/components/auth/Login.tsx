import * as React from "react";
import { I18n } from "react-i18next";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { authActions, AuthActions } from "../../store/auth/auth.actions";
import { AuthState } from "../../store/auth/auth.state";
import { RootState } from '../../store';

import "./Login.scss";

// -------------------------------------------------------------------------
// Props & State Definitions
// -------------------------------------------------------------------------

interface Props { }

interface State {
  username: string;
  password: string;
}

// -------------------------------------------------------------------------
// Redux Configuration
// -------------------------------------------------------------------------

function mapStateToProps(state: any): any {
  return { auth: state.auth };
}

function mapDispatchToProps(dispatch: any): any {
  return { actions: bindActionCreators<any>(authActions, dispatch) };
}

// -------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------

class Login extends React.Component<Props & { auth: AuthState, actions: AuthActions }, State> {

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  private onUsernameChanged = (event: React.ChangeEvent<any>) => {
    this.setState(
      Object.assign({}, this.state, {
        username: event.target.value
      })
    );
  }

  private onPasswordChanged = (event: React.ChangeEvent<any>) => {
    this.setState(
      Object.assign({}, this.state, {
        password: event.target.value
      })
    );
  }

  private onSignInClicked = (event: any) => {
    event.preventDefault();
    this.props.actions.signInUser({
      username: this.state.username,
      password: this.state.password,
    });
  }

  public render(): React.ReactNode {
    console.log('render', this.props);

    if (this.props.auth && this.props.auth.isAuthenticated) {
      const { from } = { from: { pathname: "/games" } };
      return <Redirect to={from} />;
    }

    return (
      <I18n>
        {
          (t) => (
            <div className="login">
              <form className="form-signin" noValidate>
                <label htmlFor="inputUsername" className="sr-only">{t("LABEL.USERNAME")}</label>
                <input
                  id="inputUsername"
                  className="form-control"
                  type="text"
                  placeholder={t("LABEL.USERNAME")}
                  value={this.state.username}
                  onChange={this.onUsernameChanged}
                  required />

                <label htmlFor="inputPassword" className="sr-only">{t("LABEL.PASSWORD")}</label>
                <input
                  id="inputPassword"
                  className="form-control"
                  type="password"
                  placeholder={t("LABEL.PASSWORD")}
                  value={this.state.password}
                  onChange={this.onPasswordChanged}
                  required />

                <button
                  className="btn btn-lg btn-primary btn-block"
                  onClick={this.onSignInClicked}>
                  {t("LOGIN.SIGN_IN")}
                </button>
              </form>
            </div>
          )
        }
      </I18n>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login as any);
