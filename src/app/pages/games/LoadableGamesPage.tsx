import React from "react";
import Loadable from "react-loadable";

import { Spinner } from "../../components/layout/spinner/Spinner";

export const LoadableGamesPage = Loadable({
  loader: () => import("./GamesPage"),
  loading: Spinner,
  delay: 600,
});
