import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

// Utilizing Alerts
// Use an alias for react-alert Provider since provider currently exiss
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import PrivateRoute from "./common/PrivateRoute";

import Header from "./layout/Header";
import Dashboard from "./leads/dashboard";
import Alerts from "./layout/Alerts";

import Login from "./accounts/Login";
import Register from "./accounts/Register";

// Utilizing Redux
import { Provider } from "react-redux";
import store from "../store";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Header />
              <Alerts />
              <div className="container">
                {/* Switch Component is used to group Routes together */}
                <Switch>
                  {/* Route provides Routes based on url path */}
                  <PrivateRoute exact path="/" component={Dashboard} />
                  <Route exatch path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
