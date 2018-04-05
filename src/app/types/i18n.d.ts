import * as React from "react";
import * as reactI18Next from 'react-i18next';

declare module 'react-i18next' {

  export interface I18nProps {
    ns?: string[]
  }

  export class I18n extends React.Component<I18nProps> { }

}
