import React from "react";
import Loadable from "react-loadable";

import { Spinner } from "../../components/layout/spinner/Spinner";

export const LoadableHomePage = Loadable({
  loader: () => import("./HomePage"),
  loading: Spinner,
  delay: 600,
});
