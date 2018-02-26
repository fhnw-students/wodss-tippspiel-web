import * as React from "react";
import { translate } from "react-i18next";
import { List } from "immutable";

/**
 * @name NavLanguageSelect
 * @description Renders a dropdown to change the apps language.
 */
@translate()
export class NavLanguageSelect extends React.Component<any, any> {

  public render(): JSX.Element {
    const { t, i18n } = this.props;

    const changeLanguage = (lng) => {
      i18n.changeLanguage(lng);
    };

    const languages = List([
      {
        keys: List(["de", "de-CH"]),
        label: t("NAV.LANG.DE")
      },
      {
        keys: List(["en", "en-US"]),
        label: t("NAV.LANG.EN")
      }
    ]);

    const getLanguage = (lng) => {
      return languages
        .filter((l) => !!l && l.keys.indexOf(lng) >= 0)
        .map<string>((l) => l.label)
        .first();
    };

    return (
      <li className="nav-item dropdown">
        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
          data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {getLanguage(i18n.language)}
        </a>
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          {languages.map((l) => <a
            key={l.keys.first()}
            className="dropdown-item"
            onClick={() => changeLanguage(l.keys.first())}>
            {l.label}
          </a>)}
        </div>
      </li>
    );
  }

}
