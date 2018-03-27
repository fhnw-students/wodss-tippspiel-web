import * as React from "react";
import { translate } from "react-i18next";

/**
 * @name ResetPasswordPage
 * @description Site to request a reset of his password
 */
@translate()
export default class ResetPasswordPage extends React.Component<any, any> {

  public render(): React.ReactNode {
    const { t } = this.props;
    return (
      <div className="container">
        <h1>{t("RESET_PASSWORD.TITLE")}</h1>

        <p>Text</p>

        <form>
          <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }

}
