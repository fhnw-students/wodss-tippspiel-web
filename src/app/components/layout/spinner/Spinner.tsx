import * as React from "react";

import "./Spinner.scss";

/**
 * @name Spinner
 * @description Component to indicate that some content is still loading.
 */
export const Spinner = ({ }) => (
  <div className="sk-folding-cube">
    <div className="sk-cube1 sk-cube"></div>
    <div className="sk-cube2 sk-cube"></div>
    <div className="sk-cube4 sk-cube"></div>
    <div className="sk-cube3 sk-cube"></div>
  </div>
);
