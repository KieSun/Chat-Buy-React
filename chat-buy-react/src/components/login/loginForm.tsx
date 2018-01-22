import * as React from "react";
import { List, InputItem, WingBlank, WhiteSpace, Button } from "antd-mobile";
import { User } from "../../actions/user";

interface Props {
  login: () => void;
  push: () => void;
  handleTextChange: (type: keyof User, value: any) => void;
}

const LoginForm = ({ login, push, handleTextChange }: Props) => (
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
export default LoginForm;
