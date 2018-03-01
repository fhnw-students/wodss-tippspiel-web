import React from "react";
import Loadable from "react-loadable";
import { Route, Switch } from "react-router-dom";

import { LoadableHomePage } from "../pages/home/LoadableHomePage";

/**
 * @name Routes
 * @description Defines all the routes of our app.
 */
export class Routes extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <Switch>
        <Route exact path="/" component={LoadableHomePage} />
      </Switch>
    );
  }
}
