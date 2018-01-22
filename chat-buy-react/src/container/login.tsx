/* eslint-disable import/first */

import { RouteComponentProps } from "react-router";
import LoginForm from "../components/login/loginForm";
import { connect } from "react-redux";
import { login, User } from "../actions/user";
import * as React from "react";


interface Action {
  login: (state: User) => void
}

@(connect(null, { login }) as any)
class Login extends React.Component<RouteComponentProps<Login> & Action, User> {
  state: User = {
    user: "",
    pwd: ""
  }
  handleTextChange = (key: keyof User, value: string) => {
    this.setState({
      [key]: value
    });
  }
  handleLogin = () => {
    this.props.login(this.state);
  }
  handlePush = () => {
    this.props.history.push("register");
  }
  componentWillMount() {
    setTimeout(() => {
      console.log('object');
      this.setState({
        user: 'value'
      });
      console.log(this.state);
    },5000)
  }
  componentDidMount() {
    setTimeout(() => {
      console.log('object1');
      this.setState({
        user: 'yck'
      });
      console.log(this.state);
    },5000)
  }
  render() {
    return (
      <div>
        <LoginForm
          push={this.handlePush}
          login={this.handleLogin}
          handleTextChange={this.handleTextChange}
        />
      </div>
    );
  }
}

export default Login;
