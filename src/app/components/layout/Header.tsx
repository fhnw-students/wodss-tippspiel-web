import * as React from "react";
import { translate } from "react-i18next";
import { Link } from "react-router-dom";

import { NavLanguageSelect } from "./nav/NavLanguageSelect";
import { NavMenuLink } from "./nav/NavMenuLink";

/**
 * @name Header
 * @description Renders the header for the app with the navigation.
 */
const _Header = ({ t }) => (
  <header>
    <nav className="navbar navbar-expand-md fixed-top navbar-dark bg-primary">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <i className="fas fa-trophy fa-2x"></i>
          <span>{t("APP.TITLE")}</span>
        </Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <NavMenuLink activeOnlyWhenExact={true} to="/games" label={t("GAMES.TITLE")} />
          </ul>

          <ul className="navbar-nav mt-2 mt-md-0">
            <NavLanguageSelect />
          </ul>
        </div>
      </div>
    </nav>
  </header>
);

export const Header: any = translate()(_Header);
