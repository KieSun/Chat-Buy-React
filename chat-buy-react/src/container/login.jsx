import React from "react";
import LoginForm from "../components/login/loginForm";
import { connect } from "react-redux";
import { login } from "../actions/user";

@connect(null, { login })
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      pwd: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePush = this.handlePush.bind(this);
  }
  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  handleLogin() {
    this.props.login(this.state);
  }
  handlePush() {
    this.props.history.push("register");
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
