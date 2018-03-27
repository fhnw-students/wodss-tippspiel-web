import React from "react";
import Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";

import { PrivateRoute } from "./PrivateRoute";
import { LoadableHomePage } from "../pages/home/LoadableHomePage";
import { LoadableGamesPage } from "../pages/games/LoadableGamesPage";
import { LoadableRegisterPage } from "../pages/register/LoadableRegisterPage";
import { LoadableResetPasswordPage } from "../pages/reset-password/LoadableResetPasswordPage";

/**
 * @name Routes
 * @description Defines all the routes of our app.
 */
export class Routes extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route exact path="/" component={LoadableHomePage} />
        <Route exact path="/register" component={LoadableRegisterPage} />
        <Route exact path="/reset-password" component={LoadableResetPasswordPage} />

        <PrivateRoute exact path="/games" component={LoadableGamesPage} />
      </Switch>
    );
  }
}
