import * as React from 'react';

import { getAppName, getAppVersion } from '../../utils/app-config';
import './Footer.scss';

/**
 * @name Footer
 * @description Renders the footer for the app.
 */
export const Footer = ({ }) => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="text-muted">{getAppName()} © w3tec 2017</p>
        </div>
        <div className="col text-right">
          <p className="text-muted">Portal {getAppVersion()} - API {}</p>
        </div>
      </div>
    </div>
  </footer>
);
