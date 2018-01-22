import React from "react";
import {
  List,
  InputItem,
  WingBlank,
  WhiteSpace,
  Button,
  Radio
} from "antd-mobile";
import { User } from "../../actions/user";
import { RadioType } from "../../container/register";

interface Props {
  register: () => void;
  radioData: Array<RadioType>;
  handleTextChange: (type: keyof User, value: string) => void;
  type: string | undefined;
}

const RegisterForm = ({
  register,
  radioData,
  handleTextChange,
  type
}: Props) => (
  <div style={{ marginTop: "100px" }}>
    <WingBlank>
      <List>
        <InputItem onChange={v => handleTextChange("user", v)}>
          用户名
        </InputItem>
        <WhiteSpace />
        <InputItem onChange={v => handleTextChange("pwd", v)}>密码</InputItem>
        <WhiteSpace />
        <div>
          {radioData.map(i => (
            <Radio.RadioItem
              key={i.type}
              checked={type === i.type}
              onChange={() => handleTextChange("type", i.type)}
            >
              {i.text}
            </Radio.RadioItem>
          ))}
        </div>
      </List>
      <WhiteSpace />
      <Button type="primary" onClick={register}>
        注册
      </Button>
    </WingBlank>
  </div>
);

export default RegisterForm;
