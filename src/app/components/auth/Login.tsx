import * as React from "react";
import { translate } from "react-i18next";

import "./Login.scss";

@translate()
export class Login extends React.Component<any, any> {

  public render(): React.ReactNode {
    const { t } = this.props;
    return (
      <div className="login">
        <form className="form-signin">
          <label htmlFor="inputUsername" className="sr-only">{t("LABEL.USERNAME")}</label>
          <input type="text" id="inputUsername" className="form-control" placeholder={t("LABEL.USERNAME")} required />
          <label htmlFor="inputPassword" className="sr-only">{t("LABEL.PASSWORD")}</label>
          <input type="password" id="inputPassword" className="form-control" placeholder={t("LABEL.PASSWORD")} required />

          <button className="btn btn-lg btn-primary btn-block" type="submit">
            {t("LOGIN.SIGN_IN")}
          </button>
        </form>
      </div>
    );
  }
}
