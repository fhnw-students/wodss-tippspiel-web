import React from "react";
import { Route, Switch } from "react-router-dom";

import { Routes } from "../routes/Routes";
import Footer from "./layout/Footer";
import Header from "./layout/Header";

/**
 * @name App
 * @description Renders our main skeleton of our app;
 */
export const App = ({ }) => (
  <div>
    <Header />
    <Routes />
    <Footer />
  </div>
);
