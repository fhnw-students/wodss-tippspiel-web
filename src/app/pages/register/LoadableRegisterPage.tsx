import React from "react";
import Loadable from "react-loadable";

import { Spinner } from "../../components/layout/spinner/Spinner";

export const LoadableRegisterPage = Loadable({
  loader: () => import("./RegisterPage"),
  loading: Spinner,
  delay: 600,
});
