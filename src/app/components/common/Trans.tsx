import * as React from "react";
import { translate } from "react-i18next";

type TransFunction = ({ translate: string }) => JSX.Element;

export const Trans = ({ translate, t }) => (<span>{t(translate)}</span>);

export default translate()(Trans as TransFunction);
