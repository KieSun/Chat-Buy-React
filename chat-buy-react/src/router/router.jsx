import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import asyncComponent from '../asyncComponent'
// import history from '../common/historty'

const Login = asyncComponent(() => import('../container/login'))
const Register = asyncComponent(() => import('../container/register'))

const Root = () => (
      <BrowserRouter>
        <MuiThemeProvider>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
)

export default Root