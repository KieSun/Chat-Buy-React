import React from "react";
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from "antd-mobile";
import PropTypes from "prop-types";

const RegisterForm = ({ register, radioData, handleTextChange, type }) => (
  <div style={{ marginTop: "100px" }}>
    <WingBlank>
      <List>
        <InputItem onChange={v => handleTextChange("user", v)}>
          用户名
        </InputItem>
        <WhiteSpace />
        <InputItem onChange={v => handleTextChange("pwd", v)}>密码</InputItem>
        <WhiteSpace />
        {radioData.map(i => (
          <Radio.RadioItem
            key={i.type}
            checked={type === i.type}
            onChange={() => handleTextChange("type", i.type)}
          >
            {i.text}
          </Radio.RadioItem>
        ))}
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={register}>
        注册
      </Button>
    </WingBlank>
  </div>
);

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  radioData: PropTypes.array.isRequired,
  handleTextChange: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired
};

export default RegisterForm;
