import React from "react";
import ReactDOM from "react-dom";

// Required for Redux store setup
import { Provider } from "react-redux";
import configureStore from "./store";

import "./index.css";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import registerServiceWorker from "./registerServiceWorker";

import { BrowserRouter as Router, Route } from "react-router-dom";

ReactDOM.render(
  <Provider store={configureStore()}>
    <Router>
      <Route exact path="/detail/:volume_id" component={Detail} />
      <Route exact path="/" component={Home} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
