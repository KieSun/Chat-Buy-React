import * as React from "react";
import LoginForm from "../components/login/loginForm";
import { connect } from "react-redux";
import { login } from "../actions/user";

interface Props {
  history: any
}

interface Action {
  login: (state: State) => void
}

interface State {
  user?: string
  pwd?: string
}

@(connect(null, { login }) as any)
class Login extends React.Component<Props & Action, State> {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
      pwd: ""
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handlePush = this.handlePush.bind(this);
  }
  handleTextChange(key: string, value: string) {
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
