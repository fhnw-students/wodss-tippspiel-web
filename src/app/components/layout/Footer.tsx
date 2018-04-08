import * as React from 'react';

import { getAppName, getAppVersion } from '../../utils/app-config';
import './Footer.scss';

/**
 * @name Footer
 * @description Renders the footer for the app.
 */
const Footer = ({ }) => (
  <footer className="footer">
    <div className="container">
      <div className="row">
        <div className="col">
          <p>{getAppName()} © HeimHirschEli</p>
        </div>
        <div className="col text-right">
          <p>Portal {getAppVersion()} - API {}</p>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
