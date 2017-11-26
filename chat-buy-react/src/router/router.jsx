import React from "react";
import {BrowserRouter, Route} from "react-router-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import asyncComponent from '../components/asyncComponent'
// import history from '../common/historty'

import Login from '../container/login'

const Root = () => (
      <BrowserRouter>
        <MuiThemeProvider>
          <Route path="/" component={Login}/>
        </MuiThemeProvider>
      </BrowserRouter>
)

export default Root