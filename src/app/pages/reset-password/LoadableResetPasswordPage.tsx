import React from "react";
import Loadable from "react-loadable";

import { Spinner } from "../../components/layout/spinner/Spinner";

export const LoadableResetPasswordPage = Loadable({
  loader: () => import("./ResetPasswordPage"),
  loading: Spinner,
  delay: 600,
});
