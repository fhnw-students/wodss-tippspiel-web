import * as React from "react";
import { I18n } from "react-i18next";

/**
 * @name RegisterPage
 * @description Her is a user able to register to the app
 */
export default class RegisterPage extends React.Component<any, any> {

  public render(): React.ReactNode {
    return (
      <I18n>
        {
          (t) => (
            <div className="container">
              <h1>{t("REGISTER.TITLE")}</h1>

              <p>Text</p>

              <form>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                  <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          )
        }
      </I18n>
    );
  }

}
