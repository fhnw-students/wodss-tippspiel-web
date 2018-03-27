import React from "react";
import Loadable from "react-loadable";
import { Route, Redirect } from "react-router-dom";

// TODO: Add login logic
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      true ? (
        <Component {...props} />
      ) : (
          <Redirect
            to={{
              pathname: "/",
              state: { from: props.location }
            }}
          />
        )
    }
  />
);
