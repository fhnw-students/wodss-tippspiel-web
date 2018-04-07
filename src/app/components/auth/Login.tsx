import * as React from "react";
import { I18n } from "react-i18next";
import Trans from "../common/Trans";

import "./Login.scss";

interface Props { }

interface State { }

export default class Login extends React.Component<Props, State> {

  public render(): React.ReactNode {
    return (
      <I18n>
        {
          (t) => (
            <div className="login">
              <form className="form-signin">
                <label htmlFor="inputUsername" className="sr-only">{t("LABEL.USERNAME")}</label>
                <input type="text" id="inputUsername" className="form-control" placeholder={t("LABEL.USERNAME")} required />

                <label htmlFor="inputPassword" className="sr-only">{t("LABEL.PASSWORD")}</label>
                <input type="password" id="inputPassword" className="form-control" placeholder={t("LABEL.PASSWORD")} required />

                <button className="btn btn-lg btn-primary btn-block" type="submit">
                  <Trans translate="LOGIN.SIGN_IN"></Trans>
                </button>
              </form>
            </div>
          )
        }
      </I18n>
    );
  }
}
