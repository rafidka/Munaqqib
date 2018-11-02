import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ILayoutState } from "./Containers/Layout/state";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import store from "./store";

export interface IMunaqqibState {
  layout: ILayoutState;
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);
registerServiceWorker();
