import * as React from 'react';

import { NavLanguageSelect } from './nav/NavLanguageSelect';
import { NavMenuLink } from './nav/NavMenuLink';

/**
 * @name Header
 * @description Renders the header for the app with the navigation.
 */
export const Header = ({ }) => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
      <div className="container">
        <a className="navbar-brand" href="#">
          <span>Tippspiel</span>
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
            <NavMenuLink activeOnlyWhenExact={true} to="/" label="Home" />
          </ul>

          <ul className="navbar-nav mt-2 mt-md-0">
            <NavLanguageSelect />
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
