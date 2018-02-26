import { faCoffee, faRocket, faStar } from '@fortawesome/fontawesome-free-solid';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

import * as React from 'react';
import { translate } from 'react-i18next';
import { Link } from 'react-router-dom';

/**
 * @name HomePage
 * @description First page after the login.
 */
@translate()
export default class HomePage extends React.Component<any, any> {

  public render(): React.ReactNode {
    const { t } = this.props;
    return (
      <div className="container">
        <div className="jumbotron">
          <h1>🚀{t("HOME.TITLE")}</h1>
          <p>{t("HOME.DESCRIPTION")}</p>
        </div>

        <h2>FontAwesome</h2>
        <div className="row">
          <div className="col text-center">
            <FontAwesomeIcon icon={faRocket} size="4x" />
          </div>
          <div className="col text-center">
            <FontAwesomeIcon icon={faStar} size="4x" />
          </div>
          <div className="col text-center">
            <FontAwesomeIcon icon={faCoffee} size="4x" />
          </div>
        </div>
      </div>
    );
  }

}
