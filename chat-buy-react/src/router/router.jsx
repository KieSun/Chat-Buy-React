import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import asyncComponent from '../asyncComponent'
// import history from '../common/historty'
import { connectedRouterRedirect } from 'redux-auth-wrapper/history4/redirect'

// const userIsAuthenticated = connectedRouterRedirect({
//   // The url to redirect user to if they fail
//  redirectPath: '/register',
//   // If selector is true, wrapper will not redirect
//   // For example let's check that state contains user data
// //  allowRedirectBack: false,
//  authenticatedSelector: state => state.user.user === null,
//  // A nice display name for this check
//  wrapperDisplayName: 'UserIsAuthenticated'
// })


const Login = asyncComponent(() => import('../container/login'))
const Register = asyncComponent(() => import('../container/register'))
const DashBoard = asyncComponent(() => import('../container/dashboard'))

const Root = () => (
      <BrowserRouter>
        <MuiThemeProvider>
          <Switch>
            <Route path="/login" component={Login}/>
            <Route path="/register" component={Register}/>
            <Route component={DashBoard}/>
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
)

export default Root