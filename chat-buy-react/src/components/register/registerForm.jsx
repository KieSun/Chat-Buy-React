import React from "react";
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from "antd-mobile";
import { connect } from "react-redux";
import { regitser } from "../../actions/user";

@connect(state => state.user, { regiser: regitser })
class RegisterForm extends React.Component {
  constructor() {
    super();
    this.state = {
      user: "",
      pwd: "",
      type: "deliver"
    };
  }
  handleTextChange(key, value) {
    this.setState({
      [key]: value
    });
  }
  render() {
    const redioData = [
      { type: "deliver", text: "送货员" },
      { type: "customer", text: "顾客" }
    ];
    return (
      <div style={{ marginTop: "100px" }}>
        <WingBlank>
          <List>
            <InputItem onChange={v => this.handleTextChange("user", v)}>
              用户名
            </InputItem>
            <WhiteSpace />
            <InputItem onChange={v => this.handleTextChange("pwd", v)}>
              密码
            </InputItem>
            <WhiteSpace />
            {redioData.map(i => (
              <Radio.RadioItem
                key={i.type}
                checked={this.state.type === i.type}
                onChange={() => this.handleTextChange("type", i.type)}
              >
                {i.text}
              </Radio.RadioItem>
            ))}
          </List>
          <WhiteSpace />
          <Button type="primary" onClick={() => this.props.regiser(this.state)}>
            注册
          </Button>
        </WingBlank>
      </div>
    );
  }
}

export default RegisterForm;
