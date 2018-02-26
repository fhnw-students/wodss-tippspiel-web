import * as React from "react";
import { Route, Link } from "react-router-dom";

/**
 * @name NavMenuLink
 * @description Renders a menu link for the navigation in the header.
 */
export const NavMenuLink = ({ label, to, activeOnlyWhenExact }) => (
  <Route path={to} exact={activeOnlyWhenExact} children={({ match }) => (
    <li className={match ? "nav-item active" : "nav-item"}>
      <Link className="nav-link" to={to}>{label}</Link>
    </li>
  )} />
);
