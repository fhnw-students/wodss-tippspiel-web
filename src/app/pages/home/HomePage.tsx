import * as React from "react";
import { I18n } from "react-i18next";
import { Link } from "react-router-dom";

import Login from "../../components/auth/Login";
import "./HomePage.scss";

/**
 * @name HomePage
 * @description First page before login.
 */
export default class HomePage extends React.Component<any, any> {

  public render(): React.ReactNode {
    return (
      <I18n>
        {
          (t) => (
            <div className="home-page container">
              <div className="row">
                <div className="col col-sm-8">
                  <h1>{t("HOME.TITLE")}</h1>
                  <h2>{t("HOME.SUB_TITLE")}</h2>
                  <p className="lead">{t("HOME.DESCRIPTION")}</p>
                </div>
                <div className="col col-sm-4">
                  <Login />
                  <div className="row links">
                    <div className="col col-sm-6">
                      <Link to="/register" >{t("HOME.REGISTER_LINK")}</Link>
                    </div>
                    <div className="col col-sm-6 text-right">
                      <Link to="/reset-password" >{t("HOME.RESET_PASSWORD")}</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        }
      </I18n>
    );
  }

}
