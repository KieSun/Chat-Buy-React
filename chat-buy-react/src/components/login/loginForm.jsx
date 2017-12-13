<<<<<<< HEAD
import React from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/user";

@withRouter
@connect(state => state.user, { login })
class LoginForm extends React.Component {
  constructor() {
    super();
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {
      user: "",
      pwd: ""
    };
  }
  handleTextChange(key, value) {
    this.setState({
      [key]: value
=======
import React from 'react';
import {List, InputItem, WingBlank, WhiteSpace, Button} from 'antd-mobile';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../../actions/user';

@withRouter
@connect (state => state.user, {login})
class LoginForm extends React.Component {
  constructor () {
    super ();
    this.handleTextChange = this.handleTextChange.bind (this);
    this.state = {
      user: '',
      pwd: '',
    };
  }
  handleTextChange (key, value) {
    this.setState ({
      [key]: value,
>>>>>>> 3498d4d16f24fd8e5cc3e94b270d67f8e557c718
    });
  }
  render () {
    return (
      <div style={{ marginTop: "100px" }}>
        <WingBlank>
          <List>
<<<<<<< HEAD
            <InputItem onChange={v => this.handleTextChange("user", v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={v => this.handleTextChange("pwd", v)}>
=======
            <InputItem onChange={v => this.handleTextChange ('user', v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={v => this.handleTextChange ('pwd', v)}>
>>>>>>> 3498d4d16f24fd8e5cc3e94b270d67f8e557c718
              密码
            </InputItem>
          </List>
          <WhiteSpace />
<<<<<<< HEAD
          <Button type="primary" onClick={() => this.props.login(this.state)}>
=======
          <Button type="primary" onClick={() => this.props.login (this.state)}>
>>>>>>> 3498d4d16f24fd8e5cc3e94b270d67f8e557c718
            登录
          </Button>
          <WhiteSpace />
          <div className="button-wrapper">
            <Button
              inline
              size="small"
<<<<<<< HEAD
              style={{ width: "100px" }}
              onClick={() => this.props.history.push("/register")}
            >
              注册
            </Button>
            <Button inline size="small" style={{ width: "100px" }}>
              忘记密码
            </Button>
=======
              style={{width: '100px'}}
              onClick={() => this.props.history.push ('/register')}
            >
              注册
            </Button>
            <Button inline size="small" style={{width: '100px'}}>忘记密码</Button>
>>>>>>> 3498d4d16f24fd8e5cc3e94b270d67f8e557c718
          </div>
        </WingBlank>
      </div>
    );
  }
}

export default LoginForm;
