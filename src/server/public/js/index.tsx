// Styles
import "bootstrap/dist/css/bootstrap.css";
import "./index.css";

// Roboto Font: https://material-ui.com/style/typography/#general
import "typeface-roboto";

import React from "react";
import ReactDOM from "react-dom";
import { App } from "./app";
import { Provider } from "react-redux";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
