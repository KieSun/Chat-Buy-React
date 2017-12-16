import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import asyncComponent from "../asyncComponent";
import history from "../common/history";

const Login = asyncComponent(() => import("../container/login"));
const Register = asyncComponent(() => import("../container/register"));
const DashBoard = asyncComponent(() => import("../container/dashboard.jsx"));

const Root = () => (
  <Router history={history}>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={DashBoard} />
    </Switch>
  </Router>
);

export default Root;
