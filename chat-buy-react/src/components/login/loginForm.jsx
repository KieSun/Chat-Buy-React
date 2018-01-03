import React from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import PropTypes from "prop-types";

const LoginForm = ({ login, push, handleTextChange }) => (
  <div style={{ marginTop: "100px" }}>
    <WingBlank>
      <List>
        <InputItem onChange={v => handleTextChange("user", v)}>
          用户名
        </InputItem>
        <WhiteSpace />
        <InputItem onChange={v => handleTextChange("pwd", v)}>密码</InputItem>
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={login}>
        登录
      </Button>
      <WhiteSpace />
      <div className="button-wrapper">
        <Button inline size="small" style={{ width: "100px" }} onClick={push}>
          注册
        </Button>
        <Button inline size="small" style={{ width: "100px" }}>
          忘记密码
        </Button>
      </div>
    </WingBlank>
  </div>
);

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
  push: PropTypes.func.isRequired,
  handleTextChange: PropTypes.func.isRequired
};

export default LoginForm;
