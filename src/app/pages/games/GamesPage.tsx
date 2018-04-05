import * as React from "react";
// import { translate } from "react-i18next";
import { Link } from "react-router-dom";

/**
 * @name GamesPage
 * @description First page after the login.
 */
// @translate()
export default class GamesPage extends React.Component<any, any> {

  public render(): React.ReactNode {
    // const { t } = this.props;
    return (
      <div className="container">
        <div className="jumbotron">
          {/* <h1>🚀{t("GAMES.TITLE")}</h1> */}
          {/* <p>{t("GAMES.DESCRIPTION")}</p> */}
          <button type="button" className="btn btn-primary">Primary</button>
          <button type="button" className="btn btn-secondary">Secondary</button>
          <button type="button" className="btn btn-success">Success</button>
          <button type="button" className="btn btn-danger">Danger</button>
          <button type="button" className="btn btn-warning">Warning</button>
          <button type="button" className="btn btn-info">Info</button>
          <button type="button" className="btn btn-light">Light</button>
          <button type="button" className="btn btn-dark">Dark</button>

          <button type="button" className="btn btn-link">Link</button>
        </div>

        <h2>FontAwesome</h2>
        <div className="row">
          <div className="col text-center">
            <i className="fas fa-rocket fa-5x"></i>
          </div>
          <div className="col text-center">
            <i className="fas fa-star fa-5x"></i>
          </div>
          <div className="col text-center">
            <i className="fas fa-coffee fa-5x"></i>
          </div>
        </div>
      </div>
    );
  }

}
